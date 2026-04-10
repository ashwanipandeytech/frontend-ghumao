import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styles: [
  ]
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  error: Boolean;
  errorMessage: String;
  _date:Date;

  constructor(private adminApiService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this._date = new Date();
      this.initaddUserForm();
      this.error = false;
  }

  initaddUserForm() {
      this.addUserForm = new FormGroup({
        RoleId: new FormControl('', [Validators.required]),
        UserId: new FormControl('', [Validators.required, Validators.minLength(6)]),
        Name: new FormControl('', [Validators.required, Validators.minLength(6)]),
        Gender: new FormControl('', [Validators.required]),
        DOB: new FormControl('', [Validators.required]),
        EmailId: new FormControl('', [Validators.required]),
        MobileNo: new FormControl('', [Validators.required, Validators.minLength(10)]),
        Address: new FormControl('', [Validators.required]),
        Password: new FormControl('', [Validators.required]),
        ConfirmPassword: new FormControl('', [Validators.required]),
        CreatedBy: new FormControl('OSY001'),
      }, { 
        validators: this.ConfirmPassword.bind(this)
      });
  }
  ConfirmPassword(formGroup: FormGroup) {
    const { value: Password } = formGroup.get('Password');
    const { value: ConfirmPassword } = formGroup.get('ConfirmPassword');
    return Password === ConfirmPassword ? null : { passwordNotMatch: true };
  }

  addUserAction() {
      if (this.addUserForm.valid) {
        this.addUser();
      } else {
          this.addUserForm.markAsTouched();
          this.error = true;
          this.errorMessage = 'Form Validation Error';
      }
  }

  addUser() {
      // Get Stored token
      let token = localStorage.getItem('token');
      this.adminApiService.addUser(this.addUserForm.value, token).subscribe(
          result => {
              //console.log(result);
              if(result.success){
                  Swal.fire({
                      position: 'top-end',  
                      icon: 'success',  
                      title: 'User Created!',  
                      showConfirmButton: false,  
                      timer: 1500
                  }); 
                  setTimeout(() => {
                      this.router.navigate(['/admin/users']);
                  }, 1800);
              }
              this.error = false;
          },
          error => {
              this.error = true;
              this.errorMessage = error.error;
          }
      );
  }

  resetError() {
      this.error = false;
      this.errorMessage = '';
  }
}