import { Component, Input, OnInit } from '@angular/core';
import { Business } from '../interfaces/Business';
import { GeocodeResponse } from '../services/location/location.service';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.css']
})
export class BusinessDetailComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	@Input() business: Business = {
			id: '',
			name: '',
			is_closed: false,
			price: '',
			rating: 0,
			distance: 0,
			image_url: '',
			photos: [],
			url: '',
			address: '',
			phone: '',
		categories: [],
		coordinates: new GeocodeResponse('', ''),
		reviews: []
		}
	@Input() onGoBack! : () => void;

}
