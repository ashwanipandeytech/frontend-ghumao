import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']

})
export class LoginComponent implements OnInit {
    formGroup: FormGroup;
    bgImage = '/assets/images/bannerlogin.png';
    loginUserData = {};
    error:Boolean;
    errorMessage:String;

    constructor(private router: Router,public apiservice:ApiService) { }

    ngOnInit(): void {
        this.initLoginForm();
        this.error = false;
    }

    initLoginForm(){
        this.formGroup = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
            password: new FormControl('', [Validators.required, Validators.minLength(4)])
        });
    }

    loginAction(){
        if(this.formGroup.valid){
            this.apiservice.callApi(this.formGroup.value,'login').subscribe(
              (result: any)=> {
                  console.info(result)
               //   let response =JSON.stringify(result)
                    // Store User ID
                    // localStorage.setItem('userID', result.UserId);
                    // // Store User Role
                    // localStorage.setItem('roleID', result.RoleId);
                    // // Store Name
                     localStorage.setItem('name', result.data.name);
                    // // Store Email email
                    // localStorage.setItem('email', result.email);
                    // // Store MobileNo
                    // localStorage.setItem('mobile', result.MobileNo);
                    // // Store token
                     localStorage.setItem('token', result.data['token']);

                     this.router.navigate(['/admin']);
                },
                error => {
                    this.error = true;
                    this.errorMessage = error.error;
                }
            );
        }
    }
}
