import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  template: ``,
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
        // Store token
        let token = localStorage.getItem('token');

        this.authService.logoutUser(token).subscribe(
            response => {
                //console.log(response);
                
                // Clear all local storage items
                localStorage.clear();

                this.router.navigate(['/admin']);
            },
            error => {
                //console.log(error);
            }
        );
    }
}
