import { Component, OnInit } from '@angular/core';
import { Seo } from './../../../../models/seo.model';
import { ApiService } from 'src/app/services/api.service';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-manage-seos',
  template: `
    <div class="sidebar-container">
        <app-sidenav></app-sidenav>
            
        <div class="right-content min-vh-100">
            <div class="container-fluid">
                <app-page-title [title]="'Manage SEO'" [icon]="'fa-plus'" [button]="'Add Seos'" [url]="'/admin/seos/add'"></app-page-title>

                <div class="row">
                    <div class="col-12">
                        <div class="card shadow">
                        <div class="card-body">
                        <table *ngIf="seos" datatable class="row-border hover">
                            <thead>
                                <tr>
                                    <th>Slug</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Keywords</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr *ngFor="let seos of seos">
                                    <td>{{ seos.Slug }}</td>
                                    <td>{{ seos.Title }}</td>
                                    <td>{{ seos.Description }}</td>
                                    <td>{{ seos.Keywords }}</td>
                                    <td>
                                        <a class="btn btn-secondary btn-sm me-2" [routerLink]="['/admin/seos/edit/' + seos._id]"><i class="fas fa-pen me-2"></i> Edit</a>
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
export class ManageSeosComponent implements OnInit {
    seos: Seo[];

    constructor(private apiService: ApiService, private adminApiService: AdminService) { }

    ngOnInit(): void {
        this.loadSeos();
    }

    loadSeos(){
        this.apiService.getSeo().subscribe(response => {
            this.seos = response;
        });
    }
}
