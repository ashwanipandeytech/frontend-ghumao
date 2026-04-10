import { Feedback } from './../../../../../models/feedback.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-view-feedback',
  templateUrl: './view-feedback.component.html',
  styles: [
  ]
})
export class ViewFeedbackComponent implements OnInit {
  feedbackID: String;
  feedback: Feedback[];

  constructor(private adminApiService: AdminService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get Stored token
    let token = localStorage.getItem('token');
    this.feedbackID  = this.route.snapshot.paramMap.get('_id');

    this.adminApiService.getFeedback(token, this.feedbackID).subscribe(response => {
      this.feedback = response;
    });
  }

}
