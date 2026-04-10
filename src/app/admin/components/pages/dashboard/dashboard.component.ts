import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="sidebar-container">
        <app-sidenav></app-sidenav>

        <div class="right-content min-vh-100">
            <div class="container-fluid">
                <app-page-title [title]="'Dashboard'"></app-page-title>

                <div class="row">

                    <div class="col-4 mb-4">
                        <div class="card shadow">
                            <div class="card-header">
                                Enquiries
                            </div>
                            <div class="card-body">
                                <p class="card-text">View and mange enquiry. You can also assign enquiry to other user.</p>
                                <a class="btn btn-primary" href="/admin/enquiry" role="button">Enquires</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-4 mb-4" *ngif="false">
                        <div class="card shadow">
                            <div class="card-header">
                                Feedback
                            </div>
                            <div class="card-body">
                                <p class="card-text">View and mange feedback. Feedbacks are provided by your clients.</p>
                                <a class="btn btn-primary" href="/admin/feedback" role="button">Feedbacks</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-4 mb-4" *ngIf="_isAdmin">
                        <div class="card shadow">
                            <div class="card-header">
                                Manage Banner
                            </div>
                            <div class="card-body">
                                <p class="card-text">Add Or Delete Banner From Website home page. you can add offers in banner.</p>
                                <a class="btn btn-primary" href="/admin/banners" role="button">Banners</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-4 mb-4" *ngIf="_isAdmin">
                        <div class="card shadow">
                            <div class="card-header">
                                Manage Category
                            </div>
                            <div class="card-body">
                                <p class="card-text">You can create category and assign packages in it.</p>
                                <a class="btn btn-primary" href="/admin/categories" role="button">Category</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-4 mb-4" *ngIf="_isAdmin">
                        <div class="card shadow">
                            <div class="card-header">
                                Manage Packages
                            </div>
                            <div class="card-body">
                                <p class="card-text">Packages are the actual package that user can book.</p>
                                <a class="btn btn-primary" href="/admin/packages" role="button">Packages</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-4 mb-4" *ngIf="_isAdmin">
                        <div class="card shadow">
                            <div class="card-header">
                                Manage Itinerary
                            </div>
                            <div class="card-body">
                                <p class="card-text">Itineraries are the tour timelines which is a part of a package.</p>
                                <a class="btn btn-primary" href="/admin/itinerary" role="button">Itinerary</a>
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
export class DashboardComponent implements OnInit {
    _isAdmin : Boolean;

  constructor() { }

  ngOnInit(): void {
    this._isAdmin = false;
    let role = localStorage.getItem('roleID');
    if(role === "1"){
        this._isAdmin = true;
    }
  }

}
