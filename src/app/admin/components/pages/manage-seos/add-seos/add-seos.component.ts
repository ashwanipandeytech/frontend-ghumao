import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';  

import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-add-seos',
  templateUrl: './add-seos.component.html',
  styles: [
  ]
})
export class AddSeosComponent implements OnInit {
    addSeoFrom: FormGroup;
    error:Boolean;
    errorMessage:String;

    constructor(private adminApiService: AdminService, private router: Router) {}

    ngOnInit(): void {
        this.initaddSeoFrom();
        this.error = false;
    }

    initaddSeoFrom(){
        this.addSeoFrom = new FormGroup({
            Slug: new FormControl(''),
            Keywords: new FormControl(''),
            Description: new FormControl(''),
            Title: new FormControl('')
        });
    }

    addSeoAction(){
        // Get Stored token
        let token = localStorage.getItem('token');

        this.adminApiService.addSeo(this.addSeoFrom.value, token).subscribe(
            result => {
                if(result.success){
                    Swal.fire({
                        position: 'top-end',  
                        icon: 'success',  
                        title: 'New SEO Added!',
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