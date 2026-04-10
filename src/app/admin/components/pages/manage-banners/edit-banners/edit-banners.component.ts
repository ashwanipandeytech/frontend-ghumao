import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'; 

import { AdminService } from 'src/app/admin/services/admin.service';
import { Banner } from 'src/app/models/banner.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-banners',
  templateUrl: `./edit-banners.component.html`,
  styles: [
  ]
})
export class EditBannersComponent implements OnInit {
    banner : Observable<Banner>;
    imageSrc: any;
    categoryId:string;
    error:Boolean;
    errorMessage:String;

    imageUploadForm: FormGroup;
    editBannersFrom: FormGroup;
    constructor(private adminApiService: AdminService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.categoryId  = this.route.snapshot.paramMap.get('_id');
        this.initEditBannerForm();
        this.intiImageUploadForm();
        this.error = false;
    }

    intiImageUploadForm() {
        this.imageUploadForm = new FormGroup({
            Image: new FormControl(''),
            FileSource: new FormControl('')
        });
    }

    initEditBannerForm(){
        this.editBannersFrom = new FormGroup({
            BannerTitle: new FormControl(''),
            TitleSlug: new FormControl(''),
            Image: new FormControl('')
        });
        let token = localStorage.getItem('token');
        this.adminApiService.getBannerById(token, this.categoryId).subscribe(response => {
            this.editBannersFrom.patchValue(response[0], this.imageSrc = response[0].Image);
        });
    }

    editBannerAction(){
        if (this.editBannersFrom.valid) {
                this.editCategory();

        } else {
            this.editBannersFrom.markAsTouched();
            this.error = true;
            this.errorMessage = 'Form Validation Error';
        }
    }

    editCategory(){
        // Get Stored token
        let token = localStorage.getItem('token');
        if(!this.editBannersFrom.value.Image){
            this.editBannersFrom.value.Image = this.imageSrc;
        }
        this.adminApiService.editBanner(this.editBannersFrom.value, token, this.categoryId).subscribe(
            result => {
                if(result.success){
                    Swal.fire({
                        position: 'top-end',  
                        icon: 'success',  
                        title: 'Banner Edited!',
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
}
