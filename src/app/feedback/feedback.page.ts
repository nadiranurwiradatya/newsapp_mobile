import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  constructor() {}

  ngOnInit() {}
  feedbackText: string = '';

  submitFeedback() {
    console.log('Feedback Submitted:', this.feedbackText);
    alert('Thank you for your feedback!');
    this.feedbackText = ''; // Clear the form
  }
}
