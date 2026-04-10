import { Itinerary } from 'src/app/models/itinerary.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-manage-itinerary',
  template: `
    <div class="sidebar-container">
      <app-sidenav></app-sidenav>
          
      <div class="right-content min-vh-100">
          <div class="container-fluid">
              <app-page-title [title]="'Manage Itinerary'" [icon]="'fa-plus'" [button]="'Add Itinerary'" [url]="'/admin/itinerary/' + packageID + '/add'"></app-page-title>

              <div class="row">
                  <div class="col-12">
                      <div class="card shadow">
                      <div class="card-body">
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
export class ManageItineraryComponent implements OnInit {
    itineraries: Itinerary[];
    packageID: String;

    constructor(private route: ActivatedRoute, private apiService: ApiService, private adminApiService: AdminService) { }

    ngOnInit(): void {
        this.packageID = this.route.snapshot.paramMap.get('packageID');
        this.loadItineraries();
    }

    loadItineraries(){
        this.apiService.getItinerary(this.packageID).subscribe(response => { 
            this.itineraries = response;
        });
    }

    deleteItineraryAction(itineraryId){
        // Get Stored token
        let token = localStorage.getItem('token');

        this.adminApiService.deleteItinerary(itineraryId, token).subscribe(response => {
            this.loadItineraries();
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
