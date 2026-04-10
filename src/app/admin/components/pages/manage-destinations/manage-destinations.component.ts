import { Destination } from './../../../../models/destination.model';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-manage-destinations',
  template: `
    <div class="sidebar-container">
        <app-sidenav></app-sidenav>
            
        <div class="right-content min-vh-100">
            <div class="container-fluid">
                <app-page-title [title]="'Manage Destinations'" [icon]="'fa-plus'" [button]="'Add Destinations'" [url]="'/admin/destinations/add'"></app-page-title>

                <div class="row">
                    <div class="col-12">
                        <div class="card shadow">
                        <div class="card-body">
                        <table *ngIf="destinations" datatable class="row-border hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Hotel</th>
                                    <th>StateId</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr *ngFor="let destination of destinations">
                                    <td>{{ destination.DestinationName }}</td>
                                    <td>{{ destination.Hotel }}</td>
                                    <td>{{ destination.StateId }}</td>
                                    <td>
                                        <a class="btn btn-secondary btn-sm me-2" [routerLink]=" '/admin/destinations/edit/' + destination.DestinationSlug "><i class="fas fa-pen me-2"></i> Edit</a>
                                        <a class="btn btn-danger btn-sm" href="#"><i class="fas fa-trash-alt me-2"></i> Delete</a>
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
export class ManageDestinationsComponent implements OnInit {
    destinations: Destination[];

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.apiService.getAllDestinations().subscribe(response => {
            this.destinations = response;
        });
    }
}
