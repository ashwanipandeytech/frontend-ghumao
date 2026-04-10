import { Component, OnInit } from '@angular/core';
import { Offer } from './../../../../models/offer.model';
import { ApiService } from 'src/app/services/api.service';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-manage-offers',
  template: `
    <div class="sidebar-container">
        <app-sidenav></app-sidenav>
            
        <div class="right-content min-vh-100">
            <div class="container-fluid">
                <app-page-title [title]="'Manage Home Offers'" [icon]="'fa-plus'" [button]="'Add Offer'" [url]="'/admin/offers/add'"></app-page-title>

                <div class="row">
                    <div class="col-12">
                        <div class="card shadow">
                        <div class="card-body">
                        <table *ngIf="offers" datatable class="row-border hover">
                            <thead>
                                <tr>
                                    <th>Number</th>
                                    <th>Title</th>
                                    <th>Subtitle</th>
                                    <th>Link</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr *ngFor="let bannner of offers">
                                    <td>{{ bannner.OfferNumber }}</td>
                                    <td>{{ bannner.OfferTitle }}</td>
                                    <td>{{ bannner.TitleSlug }}</td>
                                    <td>{{ bannner.Link }}</td>
                                    <td>
                                        <button class="btn btn-danger btn-sm"
                                            [swal]="{ 
                                                icon: 'warning',
                                                title: 'Delete Offer',
                                                html: 'Are you sure you want to delete <br/>&quot;<strong>' + bannner.OfferTitle + '</strong>&quot;',
                                                confirmButtonColor: '#D60D45',
                                                confirmButtonText: 'Yes, delete it!',
                                                showCancelButton: true,
                                                cancelButtonColor: '#535C68'
                                            }"
                                            (confirm)="deleteOfferAction(bannner._id)"
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
export class ManageOffersComponent implements OnInit {
    offers: Offer[];

    constructor(private apiService: ApiService, private adminApiService: AdminService) { }

    ngOnInit(): void {
        this.loadOffers();
    }

    loadOffers(){
        this.apiService.getAllOffers().subscribe(response => {
            this.offers = response;
        });
    }

    deleteOfferAction(offerId){
        // Get Stored token
        let token = localStorage.getItem('token');

        this.adminApiService.deleteOffer(offerId, token).subscribe(
            result => {
                this.loadOffers();
            }
        );
    }
}
