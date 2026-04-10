import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';  

import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-add-offers',
  templateUrl: './add-offers.component.html',
  styles: [
  ]
})
export class AddOffersComponent implements OnInit {
    uploadImage: Boolean;
    imageUploadForm: FormGroup;
    imageSrc: any;
    addOfferFrom: FormGroup;
    error:Boolean;
    errorMessage:String;

    constructor(private adminApiService: AdminService, private router: Router) {}

    ngOnInit(): void {
        this.initAddOfferForm();
        this.intiImageUploadForm();
        this.error = false;
        this.uploadImage = true;
    }

    intiImageUploadForm() {
        this.imageUploadForm = new FormGroup({
            Image: new FormControl(''),
            FileSource: new FormControl('')
        });
    }

    initAddOfferForm(){
        this.addOfferFrom = new FormGroup({
            OfferNumber: new FormControl(''),
            OfferTitle: new FormControl(''),
            TitleSlug: new FormControl(''),
            Link: new FormControl(''),
            Image: new FormControl('')
        });
    }

    addOfferAction(){
        if (this.addOfferFrom.valid) {
            if(this.uploadImage) {
                this.imageUpload()
            }
            else {
                this.addOfferFrom.patchValue({
                    Image: $('#ImageUrl').val().toString()
                });

                this.addOffer();
            }
        } else {
            this.addOfferFrom.markAsTouched();
            this.error = true;
            this.errorMessage = 'Form Validation Error';
        }
    }

    addOffer(){
        // Get Stored token
        let token = localStorage.getItem('token');

        this.adminApiService.addOffer(this.addOfferFrom.value, token).subscribe(
            result => {
                //console.log(result);
                if(result.success){
                    Swal.fire({
                        position: 'top-end',  
                        icon: 'success',  
                        title: 'Offer Created!',
                        showConfirmButton: false,  
                        timer: 1500
                    }); 
                    setTimeout(() => {
                        this.router.navigate(['/admin/offers']);
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

    resetError(){
        this.error = false;
        this.errorMessage = '';
    }

    imageUpload() {
        // Get Stored token
        let token = localStorage.getItem('token');

        if (this.imageUploadForm.valid) {
            var formData = new FormData();
            formData.append('Image', this.imageUploadForm.get('FileSource').value);

            this.adminApiService.uploadImage(formData, token).subscribe(
                result => {
                    if (result.type === HttpEventType.Response) {
                        this.addOfferFrom.patchValue({
                            Image: result.body.toString()
                        });

                        this.addOffer();
                    }

                    if (result.type === HttpEventType.UploadProgress) {
                        const percentDone = Math.round(100 * result.loaded / result.total);
                        //console.log('Progress ' + percentDone + '%');
                    }
                },
                error => {
                    this.error = true;
                    this.errorMessage = error.error;
                }
            );
        } else {
            this.imageUploadForm.markAsTouched();
            this.error = true;
            this.errorMessage = 'Image not selected! Please select the image.';
        }
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];

            this.imageUploadForm.patchValue({
                FileSource: file
            });

            const reader = new FileReader();
            reader.onload = e => this.imageSrc = reader.result;
            reader.readAsDataURL(file);
        }
    }
}