import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as $ from 'jquery';

import { AdminService } from 'src/app/admin/services/admin.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-banners',
  templateUrl: './add-banners.component.html',
  styles: [
  ]
})
export class AddBannersComponent implements OnInit {
    uploadImage: Boolean;
    imageUploadForm: FormGroup;
    imageSrc: any;
    addBannerFrom: FormGroup;
    error:Boolean;
    errorMessage:String;

    constructor(private adminApiService: AdminService, private router: Router,private apiservice:ApiService) {}

    ngOnInit(): void {
        this.initAddBannerForm();
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

    initAddBannerForm(){
        this.addBannerFrom = new FormGroup({
            BannerTitle: new FormControl(''),
            TitleSlug: new FormControl(''),
            Image: new FormControl('')
        });
    }

    addBannerAction(){

        if (this.addBannerFrom.valid) {

          this.addBanner();
            // if(this.uploadImage) {
            //     this.imageUpload()
            // }
            // else {
            //     this.addBannerFrom.patchValue({
            //         Image: $('#ImageUrl').val().toString()
            //     });

            //     this.addBanner();
            // }
        } else {
            this.addBannerFrom.markAsTouched();
            this.error = true;
            this.errorMessage = 'Form Validation Error';
        }
    }

    addBanner(){
        // Get Stored token
        let token = localStorage.getItem('token');

        var formData = new FormData();
        formData.append('BannerTitle', this.addBannerFrom.get('BannerTitle').value);
        formData.append('BannerSubTitle', this.addBannerFrom.get('TitleSlug').value);
        formData.append('Image', this.imageUploadForm.get('FileSource').value);

        this.apiservice.callApiWithBearer(formData, 'banner/add').subscribe(
            (result:any) => {
                //console.log(result);
                if(result.success){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Banner Created!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        this.router.navigate(['/admin/banners']);
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
                        this.addBannerFrom.patchValue({
                            Image: result.body.toString()
                        });

                        this.addBanner();
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
