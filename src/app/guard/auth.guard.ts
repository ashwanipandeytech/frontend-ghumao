import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {

    }

    canActivate(): boolean {
        if(this.authService.isLoggedIn()) {
            //console.log('Authorized Access');
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    }

}
