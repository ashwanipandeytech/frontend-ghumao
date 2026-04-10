import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Testimonial } from './../../../../models/testimonial.model';
import { ApiService } from 'src/app/services/api.service';
import { AdminService } from 'src/app/admin/services/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-testimonial',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="sidebar-container">
        <app-sidenav></app-sidenav>

        <div class="right-content min-vh-100">
            <div class="container-fluid">
                <app-page-title [title]="'Manage Home Testimonials'" [icon]="'fa-plus'" [button]="'Add Testimonial'" [url]="'/admin/testimonial/add'"></app-page-title>

                <div class="row">
                    <div class="col-12">
                        <div class="card shadow">
                        <div class="card-body">
                        <table *ngIf="testimonials" datatable class="row-border hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Testimonial</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr *ngFor="let testimonial of testimonials">
                                    <td><img src="{{ testimonial.ImageSrc }}" width="180px"/></td>
                                    <td>{{ testimonial.Name }}</td>
                                    <td>{{ testimonial.Address }}</td>
                                    <td>{{ testimonial.Testimonial }}</td>
                                    <td>

                                    <a class="btn btn-secondary btn-sm mb-2" [routerLink]=" ['/admin/testimonial/edit/' + testimonial.id] "><i class="fas fa-pen me-2"></i> Edit</a>


                                        <button class="btn btn-danger btn-sm "
                                            [swal]="{
                                                icon: 'warning',
                                                title: 'Delete Testimonial',
                                                html: 'Are you sure you want to delete <br/>&quot;<strong>' + testimonial.Name + '</strong>&quot;',
                                                confirmButtonColor: '#D60D45',
                                                confirmButtonText: 'Yes, delete it!',
                                                showCancelButton: true,
                                                cancelButtonColor: '#535C68'
                                            }"
                                            (confirm)="deleteTestimonialAction(testimonial.id)"
                                        ><i class="fas fa-trash-alt me-2"></i> Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
export class ManageTestimonialComponent implements OnInit {
    testimonials: Testimonial[];

    constructor(private apiService: ApiService, private adminApiService: AdminService) { }

    ngOnInit(): void {
        this.loadTestimonials();
    }

    loadTestimonials(){
        this.apiService.callApiWithBearer({},'testimonial').subscribe((response:any) => {
          if(response.success && response.data!=''){
            this.testimonials = response.data;
            this.testimonials.map((item:any)=>{
              item.ImageSrc=environment.TESTIMONIAL_FOLDER+item.Image;
            })
          }else{
            this.testimonials =[];
          }

        });
    }

    deleteTestimonialAction(testimonialId){
        // Get Stored token
        let token = localStorage.getItem('token');

        this.apiService.callApiWithBearer(testimonialId, 'testimonial/remove').subscribe(
            (result:any) => {
              if(result.success)
                this.loadTestimonials();
            }
        );
    }
}
