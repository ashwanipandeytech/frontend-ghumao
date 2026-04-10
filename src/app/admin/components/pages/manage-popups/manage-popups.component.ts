import { Component, OnInit } from '@angular/core';
import { Popup } from './../../../../models/popup.model';
import { ApiService } from 'src/app/services/api.service';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-manage-popups',
  template: `
    <div class="sidebar-container">
        <app-sidenav></app-sidenav>
            
        <div class="right-content min-vh-100">
            <div class="container-fluid">
                <app-page-title [title]="'Manage Home Popup'"></app-page-title>

                <div class="row">
                    <div class="col-12">
                        <div class="card shadow">
                        <div class="card-body">
                        <table *ngIf="popups" datatable class="row-border hover">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr *ngFor="let popup of popups">
                                    <td>{{ popup.Title }}</td>
                                    <td><img src="{{ popup.Image}}" width="200px"></td>
                                    <td>
                                        <span class="me-2" *ngIf="popup.IsActive;else other_content">
                                            <button class="btn btn-warning btn-sm"
                                                    [swal]="{ 
                                                icon: 'warning',
                                                title: 'De-Activate Popup',
                                                html: 'Are you sure you want to de-activate <br/>&quot;<strong>' + popup.Title + '</strong>&quot;',
                                                confirmButtonColor: '#D60D45',
                                                confirmButtonText: 'Yes, Deactivate it!',
                                                showCancelButton: true,
                                                cancelButtonColor: '#535C68'
                                            }"
                                                    (confirm)="deactivatePopupAction(popup._id)"
                                            ><i class="fas fa-eye-slash me-2"></i> De-Activate</button>
                                        </span>
                                        <ng-template #other_content>
                                            <button class="btn btn-success btn-sm me-2 text-white"
                                                    [swal]="{ 
                                                icon: 'success',
                                                title: 'Activate Popup',
                                                html: 'Are you sure you want to activate <br/>&quot;<strong>' + popup.Title + '</strong>&quot;',
                                                confirmButtonColor: '#D60D45',
                                                confirmButtonText: 'Yes, Activate it!',
                                                showCancelButton: true,
                                                cancelButtonColor: '#535C68'
                                            }"
                                                    (confirm)="activatePopupAction(popup._id)"
                                            ><i class="fas fa-eye me-2"></i> Activate</button>
                                        </ng-template>
                                        
                                        
                                        <a class="btn btn-secondary btn-sm me-2" [routerLink]="['/admin/popups/edit/' + popup._id]"><i class="fas fa-pen me-2"></i> Edit</a>
                                        <button class="btn btn-danger btn-sm"
                                            [swal]="{ 
                                                icon: 'warning',
                                                title: 'Delete Popup',
                                                html: 'Are you sure you want to delete <br/>&quot;<strong>' + popup.Title + '</strong>&quot;',
                                                confirmButtonColor: '#D60D45',
                                                confirmButtonText: 'Yes, delete it!',
                                                showCancelButton: true,
                                                cancelButtonColor: '#535C68'
                                            }"
                                            (confirm)="deleteBannerAction(popup._id)"
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
export class ManagePopupsComponent implements OnInit {
    popups: Popup[];

    constructor(private apiService: ApiService, private adminApiService: AdminService) { }

    ngOnInit(): void {
        this.loadBanners();
    }

    loadBanners(){
        this.apiService.getAllPopups().subscribe(response => {
            this.popups = response;
        });
    }

    deleteBannerAction(bannerId){
        // Get Stored token
        let token = localStorage.getItem('token');

        this.adminApiService.deletePopups(bannerId, token).subscribe(
            result => {
                this.loadBanners();
            }
        );
    }

    deactivatePopupAction(popupId){
        // Get Stored token
        let token = localStorage.getItem('token');
        this.adminApiService.deactivatePopup(popupId, token).subscribe(
            result => {
                this.loadBanners();
            }
        );
    }

    activatePopupAction(popupId){
        // Get Stored token
        let token = localStorage.getItem('token');

        this.adminApiService.activatePopup(popupId, token).subscribe(
            result => {
                this.loadBanners();
            }
        );
    }
}
