# Backend Deployment Guide (backends-ghumao)

This document outlines the CI/CD process for the PHP/Node.js backend repository (`backends-ghumao`).

## 1. Branching Strategy
*   **master**: The stable source of truth.
*   **stage**: Automated deployment to `https://api.ghumao.demohandler.in/`.
*   **live**: Automated deployment to `https://api.ghumao.in/`.

---

## 2. GitHub Actions Setup

Create two workflow files in `.github/workflows/`:

### A. Stage Deployment (`deploy-stage.yml`)
Triggered on push to `stage` branch.
```yaml
name: Deploy Backend Stage
on:
  push:
    branches: [ stage ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Hostinger Stage
        uses: SamKirkland/FTP-Deploy-Action@4.3.3
        with:
          server: ${{ secrets.FTP_SERVER_STAGE }}
          username: ${{ secrets.FTP_USERNAME_STAGE }}
          password: ${{ secrets.FTP_PASSWORD_STAGE }}
          port: 21
          protocol: ftp
          local-dir: ./
          server-dir: /domains/demohandler.in/public_html/api/
          exclude: |
            **/.git*
            **/node_modules/**
            .env
```

### B. Live Deployment (`deploy-live.yml`)
Triggered on push to `live` branch.
```yaml
name: Deploy Backend Live
on:
  push:
    branches: [ live ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Hostinger Live
        uses: SamKirkland/FTP-Deploy-Action@4.3.3
        with:
          server: ${{ secrets.FTP_SERVER_LIVE }}
          username: ${{ secrets.FTP_USERNAME_LIVE }}
          password: ${{ secrets.FTP_PASSWORD_LIVE }}
          port: 21
          protocol: ftp
          local-dir: ./
          server-dir: /domains/ghumao.in/public_html/api/
          exclude: |
            **/.git*
            **/node_modules/**
            .env
            images/package/
```

---

## 3. Required GitHub Secrets
Add these to **Settings > Secrets and variables > Actions**:

| Secret Name | Description |
| :--- | :--- |
| `FTP_SERVER_STAGE` | IP Address (e.g., 145.79.211.128) |
| `FTP_USERNAME_STAGE` | FTP Username for Stage |
| `FTP_PASSWORD_STAGE` | FTP Password for Stage |
| `FTP_SERVER_LIVE` | IP Address for Live Server |
| `FTP_USERNAME_LIVE` | FTP Username for Live |
| `FTP_PASSWORD_LIVE` | FTP Password for Live |

---

## 4. Critical Safety Rules
1.  **NEVER use `dangerous-clean-slate: true`**: This will delete your uploads, user data, and images on the server.
2.  **Exclusions**: Always exclude the `.env` file to prevent overwriting server-specific database credentials.
3.  **Image Folders**: If your backend stores user-uploaded images (e.g., `images/package/`), ensure they are in the `exclude` list of your workflow so the deployment doesn't overwrite them with empty folders from the repo.

## 5. Handling CORS Issues
If you face CORS issues after deployment, ensure your server's `.htaccess` in the `api/` folder contains:
```apache
Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, DELETE, PUT"
Header set Access-Control-Allow-Headers "Content-Type, Authorization"
```

