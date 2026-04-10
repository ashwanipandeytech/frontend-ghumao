import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/services/admin.service';
import { Category } from 'src/app/models/category.model';
import { Itinerary } from 'src/app/models/itinerary.model';
import { Package } from 'src/app/models/package.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-select-package',
  template: `
    <div class="sidebar-container">
      <app-sidenav></app-sidenav>
          
      <div class="right-content min-vh-100">
          <div class="container-fluid">
              <app-page-title [title]="'Manage Itinerary'"></app-page-title>

              <div class="row">
                  <div class="col-12">
                      <div class="card shadow">
                          <div class="card-body">
                              <div class="row mb-3" style="margin-bottom:40px !important;">
                                <div class="col-md-4 col-12">
                                    <label for="CategoryId" class="form-label">Select Category</label>
                                    <select class="form-select" aria-label="CategoryId" id="CategoryId" (change)="GetPackage()">
                                        <option [selected]="true" value="0">Select Category</option>
                                        <option *ngFor="let category of categories" value="{{category.CategoryId}}">{{category.CategoryName}}</option>
                                    </select>
                                </div>
                                <div class="col-md-5 col-12">
                                    <label for="PackageId" class="form-label">Select Package</label>
                                    <select class="form-select" aria-label="PackageId" id="PackageId" (change)="GetItenerary()">
                                        <option [selected]="true" value="0">Select Package</option>
                                        <option *ngFor="let package of packages" value="{{package.PackageId}}">{{package.Title}} ({{package.NoOfDays}} Days / {{package.NoOfDays-1}} Nights)</option>
                                    </select>
                                </div>
                                <div class="col-md-3 col-12">
                                  <a class="btn btn-primary btn-sm me-2" *ngIf="itineraries" [routerLink]="'/admin/itinerary/' + itineraries[0].PackageId + '/add'" style="margin-top: 31px; height: 35px; width: 100%; padding: 5px; font-size: 15px;"><i class="fas fa-plus me-2"></i> Add Itineraries</a>
                                </div>
                            </div>
                            <table *ngIf="itineraries" datatable class="row-border hover">
                                <thead>
                                    <tr>
                                          <th>S.No.</th>
                                          <th>Itinerary</th>
                                          <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr *ngFor="let itinerary of itineraries; let i = index">
                                      <td>{{ i + 1 }}</td>
                                      <td>{{ ordinalSuffixOf(itinerary.Day) }} Day - {{ itinerary.Cities }}</td>
                                      <td>
                                          <a class="btn btn-secondary btn-sm me-2" [routerLink]=" '/admin/itinerary/edit/' + itinerary._id "><i class="fas fa-pen me-2"></i> Edit</a>
                                          <button class="btn btn-danger btn-sm"
                                              [swal]="{ 
                                                  icon: 'warning',
                                                  title: 'Delete Itinerary',
                                                  html: 'Are you sure you want to delete <br/>&quot;<strong>' + ordinalSuffixOf(itinerary.Day) + ' Day - ' + itinerary.Cities + '</strong>&quot;',
                                                  confirmButtonColor: '#D60D45',
                                                  confirmButtonText: 'Yes, delete it!',
                                                  showCancelButton: true,
                                                  cancelButtonColor: '#535C68'
                                              }"
                                              (confirm)="deleteItineraryAction(itinerary._id)"
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
export class SelectPackageComponent implements OnInit {
  categories: Category[];
  packages: Package[];
  itineraries: Itinerary[];

  constructor(private apiService: ApiService, private adminApiService: AdminService) { }

  ngOnInit(): void {
    this.apiService.getAllCategories().subscribe(response => {
        this.categories = response;
    });
  }
  GetPackage(){
    let cat = $("#CategoryId").val();
    this.apiService.getPackagesByCategory(cat).subscribe(response => {
        this.packages = response;
    });
  }
  GetItenerary(){
    let id = $("#PackageId").val();
    this.apiService.getItinerary(id).subscribe(response => {                 
        this.itineraries = response;
    });
  }

  deleteItineraryAction(itineraryId){
      // Get Stored token
      let token = localStorage.getItem('token');

      this.adminApiService.deleteItinerary(itineraryId, token).subscribe(response => {
          this.GetItenerary();
      });
  }

  ordinalSuffixOf(i) {
      var j = i % 10, k = i % 100;
      if (j == 1 && k != 11) return i + "st";
      if (j == 2 && k != 12) return i + "nd";
      if (j == 3 && k != 13) return i + "rd";
      return i + "th";
  }

}
