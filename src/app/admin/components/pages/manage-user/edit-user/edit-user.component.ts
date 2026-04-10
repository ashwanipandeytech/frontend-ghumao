import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/admin/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styles: [
  ]
})
export class EditUserComponent implements OnInit {
  addUserForm: FormGroup;
  error: Boolean;
  errorMessage: String;
  _date:Date;
  _id:String;

  constructor(private adminApiService: AdminService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this._date = new Date();
    this._id  = this.route.snapshot.paramMap.get('_id');
      this.initEditUserForm();
      this.error = false;
  }

  initEditUserForm() {
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
        IsActive: new FormControl(true),
        CreatedBy: new FormControl('OSY001'),
      });
      let token = localStorage.getItem('token');
      this.adminApiService.getUserById(token, this._id).subscribe(response => {
        this._date=new Date(response.DOB);
          this.addUserForm.patchValue(response);
      });  
  }
  ConfirmPassword(formGroup: FormGroup) {
    const { value: Password } = formGroup.get('Password');
    const { value: ConfirmPassword } = formGroup.get('ConfirmPassword');
    return Password === ConfirmPassword ? null : { passwordNotMatch: true };
  }

  addUserAction() {
      if (this.addUserForm.valid) {
        this.editUser();
      } else {
          this.addUserForm.markAsTouched();
          this.error = true;
          this.errorMessage = 'Form Validation Error';
      }
  }

  editUser() {
      // Get Stored token
      let token = localStorage.getItem('token');
      this.adminApiService.editUser(this.addUserForm.value, token, this._id).subscribe(
          result => {
              if(result.success){
                  Swal.fire({
                      position: 'top-end',  
                      icon: 'success',  
                      title: 'User Updated!',  
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
