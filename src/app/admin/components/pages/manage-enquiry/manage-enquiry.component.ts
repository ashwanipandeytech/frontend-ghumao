import { Enquiry } from './../../../../models/enquiry.model';
import {User} from './../../../../models/user.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { AdminService } from 'src/app/admin/services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from 'src/app/services/api.service';
import {DatePipe} from '@angular/common';
import Swal from 'sweetalert2';
import * as moment from 'moment';
@Component({
  selector: 'app-manage-enquiry',
  templateUrl: './manage-enquiry.component.html',
  styles: [
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ManageEnquiryComponent implements OnInit {
    assignEnquiryForm: FormGroup;
    enquiries: any=[];
    users: User[];
    userIDDefaultValue: number;

    _isAdmin : Boolean;
    _isSubAdmin : Boolean;
    dtOptions: any = {};
    selected : string[] =[];
  enquiry: any[];

    constructor(private apiService: ApiService, private adminApiService: AdminService, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe) { }

    ngOnInit(): void {
        let token = localStorage.getItem('token');
        this.loadEnquiries();
        this._isAdmin = false;
        this._isSubAdmin = false;
        let role = localStorage.getItem('roleID');
        // if(role === "1"){
        //     this._isAdmin = true;
        // }
        // if(role === "3"){
        //     this._isSubAdmin = true;
        // }

        this.dtOptions = {
            pagingType: 'full_numbers',
            dom: 'Bfrtip',
            buttons: ['colvis', 'copy', 'print', 'excel']
        };

        this.initAssignEnquiryForm();
    }

    // when checkbox change, add/remove the item from the array
    onChange(checked, item){
        if(checked.checked){
            this.selected.push(item);
        } else {
            this.selected.splice(this.selected.indexOf(item), 1)
        }
    }

    assignEnquiryAction() {
        // Get Stored token
        let token = localStorage.getItem('token');

        this.adminApiService.multiAssignEnquiry(token, this.selected, this.userIDDefaultValue).subscribe(response => {
                if (response.success) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'User Assigned!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 1800);
                }
            },
            error => {

            });
    }


    multideleteEnquiryAction() {
        // Get Stored token
        let token = localStorage.getItem('token');

        this.adminApiService.multiDeleteEnquiry(token, this.selected).subscribe(response => {
                if (response.success) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Enquiry Deleted!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 1800);
                }
            },
            error => {

            });
    }


    loadEnquiries(){
      this.apiService.callApiWithBearer('', 'enquiery').subscribe((response: any) => {
        if (response.success && response.data && response.data != '') {
          this.enquiry = response.data;
          this.enquiry.map(item=>{
            //console.info(item)
            item.DepartureDate=moment(item.Departure,'YYYY-MM-DD').format('DD-MM-YYYY')
          })
          console.info(this.enquiry)
        } else {
          this.enquiry = []
        }

      });

    }

    deleteEnquiryAction(enquiryID){
        // Get Stored token
        let token = localStorage.getItem('token');
        this.adminApiService.deleteEnquiry(token, enquiryID).subscribe(response => {
            this.loadEnquiries();
        });
    }

    initAssignEnquiryForm() {
        this.assignEnquiryForm = new FormGroup({
            AssignedUser: new FormControl('', [Validators.required])
        });
    }
}
