import { AdminService } from './../../../services/admin.service';
import { User } from './../../../../models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-user',
  template: `
  <div class="sidebar-container">
      <app-sidenav></app-sidenav>            
      <div class="right-content min-vh-100">
          <div class="container-fluid">
              <app-page-title [title]="'Manage Users'" [icon]="'fa-plus'" [button]="'Add Users'" [url]="'/admin/users/add'"></app-page-title>
              <div class="row">
                  <div class="col-12">
                      <div class="card shadow">
                          <div class="card-body">
                              <table *ngIf="users" datatable class="row-border hover">
                                  <thead>
                                      <tr>
                                          <th>User Id</th>
                                          <th>Name</th>
                                          <th>Email Address</th>
                                          <th>MobileNo</th>
                                          <th>Created On</th>
                                          <th>Actions</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr *ngFor="let user of users">
                                          <td>{{ user.UserId }}</td>
                                          <td>{{ user.Name }}</td>
                                          <td>{{ user.EmailId }}</td>
                                          <td>{{ user.MobileNo }}</td>
                                          <td>{{ user.CreatedOn | date }}</td>
                                          <td>
                                              <a class="btn btn-secondary btn-sm me-2" [routerLink]=" ['/admin/users/edit/' + user._id] "><i class="fas fa-pen me-2"></i> Edit</a>
                                              <button class="btn btn-danger btn-sm"
                                                  [swal]="{ 
                                                      icon: 'warning',
                                                      title: 'Delete User',
                                                      html: 'Are you sure you want to delete <br/>&quot;<strong>' + user.Name + '</strong>&quot;',
                                                      confirmButtonColor: '#D60D45',
                                                      confirmButtonText: 'Yes, delete it!',
                                                      showCancelButton: true,
                                                      cancelButtonColor: '#535C68'
                                                  }"
                                                  (confirm)="deleteUserAction(user._id)"
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
export class ManageUserComponent implements OnInit {
    users: User[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
      this.loadUsers();
  }
  loadUsers(){
    // Store token
    let token = localStorage.getItem('token');
    
    this.adminService.getUsers(token).subscribe(
        response=> {
            this.users=response;
        },
        error => {
            //console.log(error);
        }
    )
  }

  deleteUserAction(_id){
      // Get Stored token
      let token = localStorage.getItem('token');

      this.adminService.deleteUser(token, _id).subscribe(response => {
        this.loadUsers();
      });
  }

}
