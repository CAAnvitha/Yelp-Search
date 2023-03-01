import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../interfaces/Review';

@Component({
  selector: 'app-reviews-tab',
  templateUrl: './reviews-tab.component.html',
  styleUrls: ['./reviews-tab.component.css']
})
export class ReviewsTabComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() reviews: Review[] = []

}
