import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-destination',
  template: `
    <div class="sidebar-container">
        <app-sidenav></app-sidenav>
            
        <div class="right-content min-vh-100">
            <div class="container-fluid">
                <app-page-title [title]="'Edit Destination'"></app-page-title>
                <app-page-title [title]="'Edit Destination'" [icon]="'fa-arrow-alt-circle-left'" [button]="'Return Back To All Categories'" [url]="'/admin/destinations'"></app-page-title>
                

                <div class="row">
                    <div class="col-12">
                        <div class="card shadow">
                            <div class="card-body">
                                <h3 class="my-5">Under Construction</h3>
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
export class EditDestinationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
