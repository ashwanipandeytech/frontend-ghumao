import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/admin/services/admin.service';
import { Package } from 'src/app/models/package.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-manage-packages',
  template: `
    <div class="sidebar-container">
        <app-sidenav></app-sidenav>

        <div class="right-content min-vh-100">
            <div class="container-fluid">
                <app-page-title [title]="'Manage Package'" [icon]="'fa-plus'" [button]="'Add Package'" [url]="'/admin/packages/add'"></app-page-title>

                <div class="row">
                    <div class="col-12">
                        <div class="card shadow">
                        <div class="card-body">
                        <table *ngIf="packages" datatable class="row-border hover">
                            <thead>
                                <tr>
                                    <th>Package Name</th>

                                    <th>Days</th>
                                    <th>Package Type</th>

                                    <th >Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr *ngFor="let package of packages">
                                    <td>{{ package.PackageName }}
                                    </td>


                                    <td>{{ package.NoOfDays }}</td>

                                    <td><div class="row">
                                    <div class="col-12" *ngFor="let item of package.Type">
                                    {{item.label}}
                                    </div>
                                    </div></td>

                                    <td width="289px">


                                    <a href="package/{{package['PackageSlug']}}" target="_blank" class="btn btn-secondary btn-sm me-2" > See Package</a>
                                        <a class="btn btn-secondary btn-sm me-2 ml-2" [routerLink]=" ['/admin/packages/edit/' + package.PackageId] "><i class="fas fa-pen me-2"></i> Edit</a>
                                        <button class="btn btn-danger btn-sm ml-2"
                                            [swal]="{
                                                icon: 'warning',
                                                title: 'Delete Package',
                                                html: 'Are you sure you want to delete <br/>&quot;<strong>' + package.Title + '</strong>&quot;',
                                                confirmButtonColor: '#D60D45',
                                                confirmButtonText: 'Yes, delete it!',
                                                showCancelButton: true,
                                                cancelButtonColor: '#535C68'
                                            }"
                                            (confirm)="deletePackageAction(package.PackageId)"
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
    `@import '@angular/material/prebuilt-themes/indigo-pink.css'`
  ]
})
export class ManagePackagesComponent implements OnInit {
    packages: any;

    constructor(private apiService: ApiService, private adminApiService: AdminService) { }

    ngOnInit(): void {
        this.loadPackages();
    }

    loadPackages(){
             this.apiService.callApiWithBearer('','package').subscribe((response:any) => {
          if(response.success && response.data && response.data!=''){
            this.packages = response.data;
            this.packages.map(item=>{
              item.Type=JSON.parse(item.Type)
            })
            //this.packages.Type=JSON.parse(response.data.Type)
          }else{
            this.packages = [];
          }

        });
    }

    deletePackageAction(packageId){
      let requestPayload={
        PackageId:packageId
      }
        this.apiService.callApiWithBearer(requestPayload, 'package/remove').subscribe((response:any) => {
          if(response.success){
            this.loadPackages();
          }

        });
    }
}
