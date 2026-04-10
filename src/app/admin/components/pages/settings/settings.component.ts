import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/admin/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  template: `
    <div class="sidebar-container">
        <app-sidenav></app-sidenav>
            
        <div class="right-content min-vh-100">
            <div class="container-fluid">
                <app-page-title [title]="'Settings'"></app-page-title>

                <div class="row">
                    <div class="col-3"></div>
                    <div class="col-6">
                      <div class="card shadow">
                          <div class="card-body">
                              <form [formGroup]="addUserForm" (ngSubmit)="addUserAction()">
                                  <!-- Error Alert -->
                                  <div *ngIf="error" class="alert alert-danger alert-dismissible fade show" role="alert">
                                      {{ errorMessage }}
                                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" (click)="resetError()"></button>
                                  </div>
                                  
                                  <div class="row mb-3">
                                    <div class="col-md-12 col-12">
                                        <label for="OldPassword" class="form-label">Old Password</label>
                                        <input type="password" class="form-control" id="OldPassword" formControlName="OldPassword" autocomplete="off">

                                        <small *ngIf="addUserForm.controls['OldPassword'].valid && addUserForm.controls['OldPassword'].touched" class="text-success">
                                            <small>Old Password Set</small>
                                        </small>
                                        <small *ngIf="addUserForm.controls['OldPassword'].invalid && addUserForm.controls['OldPassword'].touched" class="text-danger">
                                            <small>Please Enter Old Password Correctly</small>
                                        </small>
                                        <small *ngIf="addUserForm.controls['OldPassword'].untouched" class="text-muted">
                                            <small>Please Enter Old Password</small>
                                        </small>
                                    </div>
                                    <div class="col-md-12 col-12">
                                        <label for="Password" class="form-label">New Password</label>
                                        <input type="password" class="form-control" id="Password" formControlName="Password" autocomplete="off">

                                        <small *ngIf="addUserForm.controls['Password'].valid && addUserForm.controls['Password'].touched" class="text-success">
                                            <small>Password Set</small>
                                        </small>
                                        <small *ngIf="addUserForm.controls['Password'].invalid && addUserForm.controls['Password'].touched" class="text-danger">
                                            <small>Please Enter Password Correctly</small>
                                        </small>
                                        <small *ngIf="addUserForm.controls['Password'].untouched" class="text-muted">
                                            <small>Please Enter Password</small>
                                        </small>
                                    </div>
                                    <div class="col-md-12 col-12">
                                        <label for="ConfirmPassword" class="form-label">Confirm Password</label>
                                        <input type="password" class="form-control" id="ConfirmPassword" formControlName="ConfirmPassword" autocomplete="off">

                                        <small *ngIf="addUserForm.controls['ConfirmPassword'].valid && addUserForm.controls['ConfirmPassword'].touched" class="text-success">
                                            <small>Confirm Password Set</small>
                                        </small>
                                        <small *ngIf="addUserForm.controls['ConfirmPassword'].invalid && addUserForm.controls['ConfirmPassword'].touched" class="text-danger">
                                            <small>Please Confirm Password Correctly</small>
                                        </small>
                                        <small *ngIf="addUserForm.controls['ConfirmPassword'].untouched" class="text-muted">
                                            <small>Please Confirm Password</small>
                                        </small>
                                    </div>
                                  </div>
                                  <button type="submit" class="btn btn-primary">Change Password</button>
                              </form>
                          </div>
                      </div>
                    </div>
                </div>                
            </div>
        </div>
    </div>
  `,
  styles: [
  ]
})
export class SettingsComponent implements OnInit {
  addUserForm: FormGroup;
  error: Boolean;
  errorMessage: String;
  _id:String;

  constructor(private adminApiService: AdminService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.initEditUserForm();
      this.error = false;
  }

  initEditUserForm() {
      this.addUserForm = new FormGroup({
        OldPassword: new FormControl('', [Validators.required]),
        Password: new FormControl('', [Validators.required]),
        ConfirmPassword: new FormControl('', [Validators.required]),
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
        this._id  = localStorage.getItem('userID');
        let token = localStorage.getItem('token');
        this.adminApiService.changeUserPWD(token, this.addUserForm.value.OldPassword, this.addUserForm.value.Password, this._id).subscribe(response => {
          if(response.success){ 
            Swal.fire({
                position: 'top-end',  
                icon: 'success',  
                title: 'User Updated!',  
                showConfirmButton: false,  
                timer: 1500
            }); 
            setTimeout(() => {
                this.router.navigate(['/admin']);
            }, 1800);
            this.error = false;
          }
          else{
            this.error = true;
            this.errorMessage = response.error;
          }
        }); 
      } else {
          this.addUserForm.markAsTouched();
          this.error = true;
          this.errorMessage = 'Form Validation Error';
      }
  }
  resetError() {
      this.error = false;
      this.errorMessage = '';
  }
}
