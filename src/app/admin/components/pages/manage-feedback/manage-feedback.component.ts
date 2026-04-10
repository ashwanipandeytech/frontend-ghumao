import { Feedback } from './../../../../models/feedback.model';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-manage-feedback',
  templateUrl: './manage-feedback.component.html',
  styles: [
  ]
})
export class ManageFeedbackComponent implements OnInit {
    feedbacks: Feedback[];

    constructor(private adminApiService: AdminService) { }

    ngOnInit(): void {
        this.loadFeedbacks();
    }

    loadFeedbacks(){
        // Get Stored token
        let token = localStorage.getItem('token');

        this.adminApiService.getAllFeedbacks(token).subscribe(response => {
            this.feedbacks = response;
        });
    }

    deleteFeedbackAction(feedbackID){
        // Get Stored token
        let token = localStorage.getItem('token');

        this.adminApiService.deleteFeedback(feedbackID, token).subscribe(response => {
            this.loadFeedbacks();
        });
    }
}
