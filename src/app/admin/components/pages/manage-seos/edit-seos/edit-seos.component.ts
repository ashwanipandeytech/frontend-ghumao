import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'; 

import { AdminService } from 'src/app/admin/services/admin.service';
import { Seo } from 'src/app/models/seo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-seos',
  templateUrl: `./edit-seos.component.html`,
  styles: [
  ]
})
export class EditSeosComponent implements OnInit {
    seo : Observable<Seo>;
    seoId:string;
    error:Boolean;
    errorMessage:String;
    editSeosFrom: FormGroup;
    constructor(private adminApiService: AdminService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.seoId  = this.route.snapshot.paramMap.get('_id');
        this.initEditSeoForm();
        this.error = false;
    }

    initEditSeoForm(){
        this.editSeosFrom = new FormGroup({
            Slug: new FormControl(''),
            Keywords: new FormControl(''),
            Description: new FormControl(''),
            Title: new FormControl('')
        });
        let token = localStorage.getItem('token');
        this.adminApiService.getSeoById(token, this.seoId).subscribe(response => {
            this.editSeosFrom.patchValue(response);
        });
    }

    editSeoAction(){
        if (this.editSeosFrom.valid) {
                this.editSeo();

        } else {
            this.editSeosFrom.markAsTouched();
            this.error = true;
            this.errorMessage = 'Form Validation Error';
        }
    }

    editSeo(){
        // Get Stored token
        let token = localStorage.getItem('token');
        this.adminApiService.editSeo(this.editSeosFrom.value, token, this.seoId).subscribe(
            result => {
                if(result.success){
                    Swal.fire({
                        position: 'top-end',  
                        icon: 'success',  
                        title: 'SEO Edited!',
                        showConfirmButton: false,  
                        timer: 1500
                    }); 
                    setTimeout(() => {
                        this.router.navigate(['/admin/seos']);
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
