import { Component, OnInit } from '@angular/core';
import { Banner } from './../../../../models/banner.model';
import { ApiService } from 'src/app/services/api.service';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-manage-banners',
  template: `
    <div class="sidebar-container">
        <app-sidenav></app-sidenav>
            
        <div class="right-content min-vh-100">
            <div class="container-fluid">
                <app-page-title [title]="'Manage Home Banners'" [icon]="'fa-plus'" [button]="'Add Banner'" [url]="'/admin/banners/add'"></app-page-title>

                <div class="row">
                    <div class="col-12">
                        <div class="card shadow">
                        <div class="card-body">
                        <table *ngIf="banners" datatable class="row-border hover">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Subtitle</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr *ngFor="let bannner of banners">
                                    <td>{{ bannner.BannerTitle }}</td>
                                    <td>{{ bannner.TitleSlug }}</td>
                                    <td>
                                        <a class="btn btn-secondary btn-sm me-2" [routerLink]="['/admin/banners/edit/' + bannner._id]"><i class="fas fa-pen me-2"></i> Edit</a>
                                        <button class="btn btn-danger btn-sm"
                                            [swal]="{ 
                                                icon: 'warning',
                                                title: 'Delete Banner',
                                                html: 'Are you sure you want to delete <br/>&quot;<strong>' + bannner.BannerTitle + '</strong>&quot;',
                                                confirmButtonColor: '#D60D45',
                                                confirmButtonText: 'Yes, delete it!',
                                                showCancelButton: true,
                                                cancelButtonColor: '#535C68'
                                            }"
                                            (confirm)="deleteBannerAction(bannner._id)"
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
export class ManageBannersComponent implements OnInit {
    banners: Banner[];

    constructor(private apiService: ApiService, private adminApiService: AdminService) { }

    ngOnInit(): void {
        this.loadBanners();
    }

    loadBanners(){
        this.apiService.getAllBanners().subscribe(response => {
            this.banners = response;
        });
    }

    deleteBannerAction(bannerId){
        // Get Stored token
        let token = localStorage.getItem('token');

        this.adminApiService.deleteBanner(bannerId, token).subscribe(
            result => {
                this.loadBanners();
            }
        );
    }
}
