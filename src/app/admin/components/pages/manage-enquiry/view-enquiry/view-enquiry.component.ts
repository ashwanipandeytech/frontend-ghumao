import {User} from 'src/app/models/user.model';
import {Enquiry} from 'src/app/models/enquiry.model';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from 'src/app/admin/services/admin.service';
import {ApiService} from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-view-enquiry',
    templateUrl: './view-enquiry.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.None,
})
export class ViewEnquiryComponent implements OnInit {
    assignEnquiryForm: FormGroup;
    MarkFormEdit: FormGroup;
    FollowupEdit: FormGroup;
    AdditionalNote: FormGroup;
    enquiryID: String;
    enquiry: Enquiry[];

    users: User[];
    userIDDefaultValue: number;
    Mark: string;
    Notes: string;
    MarkReason: string;
    FollowUpDate: string;
    _isAdmin: Boolean;
    _isSubAdmin: Boolean;
    _isUser: Boolean;

    error: Boolean;
    errorMessage: String;

    constructor(private apiService: ApiService, private adminApiService: AdminService, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe) {
    }

    ngOnInit(): void {
        // Get Stored token
        let token = localStorage.getItem('token');
        this.enquiryID = this.route.snapshot.paramMap.get('enquiryID');

        // this.adminApiService.getEnquiry(token, this.enquiryID).subscribe(response => {
        //     this.enquiry = response;
        // });
//console.info('here')





        // this.adminApiService.getUsers(token).subscribe(response => {
        //     this.users = response;
        //     this.userIDDefaultValue = 0;
        // });

        this.initAssignEnquiryForm();
        this.initMarkFormEdit();
        this.initFollowupEdit();
        this.initAdditionalNote();
        this.error = false;

        this._isAdmin = false;
        this._isSubAdmin = false;
        this._isUser = false;
        let role = localStorage.getItem('roleID');
        // if (role === "1") {
        //     this._isAdmin = true;
        // } else if (role === "3") {
        //     this._isSubAdmin = true;
        // } else {
        //     this._isUser = true;
        // }
    }

    assignEnquiryAction() {
        // Get Stored token
        let token = localStorage.getItem('token');
        this.enquiryID = this.route.snapshot.paramMap.get('enquiryID');

        if (0 !== this.userIDDefaultValue) {
            this.enquiry['AssignedUser'] = this.userIDDefaultValue;
        }

        this.adminApiService.markEnquiry(token, this.enquiryID, this.enquiry).subscribe(response => {
                if (response.success) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'User Assigned!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        this.router.navigate(['/admin/enquiry']);
                    }, 1800);
                }
                this.error = false;
            },
            error => {
                this.error = true;
                this.errorMessage = error.error;
            });
    }


    MarkFormEditAction() {
        // Get Stored token
        let token = localStorage.getItem('token');
        this.enquiryID = this.route.snapshot.paramMap.get('enquiryID');
        let mark = this.Mark;
        let markReason = this.MarkReason;

        this.adminApiService.markEnquiry(token, this.enquiryID, {"Mark":mark, "MarkReason":markReason}).subscribe(response => {
                if (response.success) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Enquiry Marked As '+ mark,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        this.router.navigate(['/admin/enquiry']);
                    }, 1800);
                }
                this.error = false;
            },
            error => {
                this.error = true;
                this.errorMessage = error.error;
            });
    }

    FollowupAction() {
        // Get Stored token
        let token = localStorage.getItem('token');
        this.enquiryID = this.route.snapshot.paramMap.get('enquiryID');
        //console.log(this.FollowUpDate);

        this.adminApiService.followupEnquiry(token, this.enquiryID, {"FollowUpDate":this.FollowUpDate}).subscribe(response => {
                if (response.success) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Follow Up Date Assigned!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        this.router.navigate(['/admin/enquiry']);
                    }, 1800);
                }
                this.error = false;
            },
            error => {
                this.error = true;
                this.errorMessage = error.error;
            });
    }


    AdditionalNoteAction() {
        // Get Stored token
        let token = localStorage.getItem('token');
        this.enquiryID = this.route.snapshot.paramMap.get('enquiryID');
        let notes = this.Notes;

        this.adminApiService.aditionalNotes(token, this.enquiryID, {"Notes":notes}).subscribe(response => {
                if (response.success) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Additional NOtes Added',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        this.router.navigate(['/admin/enquiry']);
                    }, 1800);
                }
                this.error = false;
            },
            error => {
                this.error = true;
                this.errorMessage = error.error;
            });
    }

    initAssignEnquiryForm() {
        this.assignEnquiryForm = new FormGroup({
            AssignedUser: new FormControl('', [Validators.required])
        });
    }

    initMarkFormEdit() {
        this.MarkFormEdit = new FormGroup({
            Mark: new FormControl('', [Validators.required]),
            MarkReason: new FormControl('', [Validators.required])
        });
    }

    initFollowupEdit() {
        this.FollowupEdit = new FormGroup({
            FollowUpDate: new FormControl('', [Validators.required])
        });
    }

    initAdditionalNote() {
        this.AdditionalNote = new FormGroup({
            Notes: new FormControl('', [Validators.required])
        });
    }

    resetError() {
        this.error = false;
        this.errorMessage = '';
    }
}
