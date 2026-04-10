import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'; 

import { AdminService } from 'src/app/admin/services/admin.service';
import { Popup } from 'src/app/models/popup.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-popups',
  templateUrl: `./edit-popups.component.html`,
  styles: [
  ]
})
export class EditPopupsComponent implements OnInit {
    popup : Observable<Popup>;
    uploadImage: Boolean;
    imageSrc: any;
    popupId:string;
    error:Boolean;
    errorMessage:String;

    imageUploadForm: FormGroup;
    editPopupsFrom: FormGroup;
    constructor(private adminApiService: AdminService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.popupId  = this.route.snapshot.paramMap.get('_id');
        this.initEditBannerForm();
        this.intiImageUploadForm();
        this.error = false;
        this.uploadImage = false;
    }

    intiImageUploadForm() {
        this.imageUploadForm = new FormGroup({
            Image: new FormControl(''),
            FileSource: new FormControl('')
        });
    }

    initEditBannerForm(){
        this.editPopupsFrom = new FormGroup({
            Title: new FormControl(''),
            Image: new FormControl('')
        });
        let token = localStorage.getItem('token');
        this.adminApiService.getPopupById(token, this.popupId).subscribe(response => {
            this.editPopupsFrom.patchValue(response[0], this.imageSrc = response[0].Image);
        });
    }

    editPopupAction(){
        if (this.editPopupsFrom.valid) {
            if(this.uploadImage) {
                this.imageUpload()
            }
            else {
                this.editPopupsFrom.patchValue({
                    Image: $('#ImageUrl').val().toString()
                });

                this.editPopup();
            }
        } else {
            this.editPopupsFrom.markAsTouched();
            this.error = true;
            this.errorMessage = 'Form Validation Error';
        }
    }

    editPopup(){
        // Get Stored token
        let token = localStorage.getItem('token');
        if(!this.editPopupsFrom.value.Image){
            this.editPopupsFrom.value.Image = this.imageSrc;
        }
        this.adminApiService.editPopup(this.editPopupsFrom.value, token, this.popupId).subscribe(
            result => {
                if(result.success){
                    Swal.fire({
                        position: 'top-end',  
                        icon: 'success',  
                        title: 'Popup Edited!',
                        showConfirmButton: false,  
                        timer: 1500
                    }); 
                    setTimeout(() => {
                        this.router.navigate(['/admin/popups']);
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
                        this.editPopupsFrom.patchValue({
                            Image: result.body.toString()
                        });

                        this.editPopup();
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
            this.uploadImage = true;
            const file = event.target.files[0];

            this.imageUploadForm.patchValue({
                FileSource: file
            });

            const reader = new FileReader();
            reader.onload = e => this.imageSrc = reader.result;
            reader.readAsDataURL(file);
        }
    }

    enableDisableImageUploadAction(){
        if($('#enableUpload').prop('checked')){
            $('#uploadImageCard').show();
            $('#uploadUrlCard').hide();
            this.uploadImage = true;
        } else {
            $('#uploadImageCard').hide();
            $('#uploadUrlCard').show();
            this.uploadImage = false;
        }
    }
}
