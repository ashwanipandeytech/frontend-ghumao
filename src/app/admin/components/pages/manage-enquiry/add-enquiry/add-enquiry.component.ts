import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-enquiry',
  templateUrl: './add-enquiry.component.html',
  styles: [
  ]
})
export class AddEnquiryComponent implements OnInit {
    formGroup: FormGroup;
    enquiryFromData = {};
    error:Boolean;
    errorMessage:String;
    isActive:boolean;

  constructor(private adminApiService: AdminService, private router: Router) {}

  ngOnInit(): void {
      this.initEnquiryForm();
      this.isActive = false;
  }

    initEnquiryForm() {
        this.formGroup = new FormGroup({
            PersonName: new FormControl('', [Validators.minLength(4)]),
            EmailId: new FormControl('', [Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
            MobileNo: new FormControl('', [Validators.minLength(10)]),
            Departure: new FormControl('', [Validators.minLength(3)]),
            Destination: new FormControl('', [Validators.minLength(3)]),
            Noper: new FormControl('', [Validators.min(1), Validators.max(99)]),
            Message: new FormControl('', []),
            Source: new FormControl('', [])
        });
  }

    enquirySubmitAction() {
      if (this.formGroup.valid) {
        this.addQuery();
      } else {
          this.formGroup.markAsTouched();
          this.error = true;
          this.errorMessage = 'Form Validation Error';
      }
  }

  addQuery() {
      // Get Stored token
      let token = localStorage.getItem('token');
      this.adminApiService.addQuery(this.formGroup.value, token).subscribe(
          result => {
              if(result.success){
                  Swal.fire({
                      position: 'top-end',  
                      icon: 'success',  
                      title: 'Enquirey Created!',
                      showConfirmButton: false,  
                      timer: 1500
                  }); 
                  setTimeout(() => {
                      this.router.navigate(['/admin/query']);
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