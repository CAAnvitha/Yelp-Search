import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Business } from '../interfaces/Business';
import { SearchData } from '../interfaces/SearchData';
import { GeocodeResponse, LocationService } from '../services/location/location.service';
import { YelpService } from '../services/yelp/yelp.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	constructor(private yelpService: YelpService, private locationService: LocationService) { }

	ngOnInit(): void {
	}

	businesses: Business[] = [];
	selectedBusiness: Business = {
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
	};
	showDetails = false;
	showNoResultsMessage = false;

	onSearchFormDataSubmit(searchFormData: SearchData) {
		console.log(searchFormData)
		let coordinates;
		if (searchFormData.autoDetectLocation) {
			this.locationService.getIpInfoLocation().subscribe(data => {
				if (data) {
					var geocodes = data.loc.split(",");
					coordinates = new GeocodeResponse(geocodes[0], geocodes[1]);
				} else {
					coordinates = new GeocodeResponse('', '');
				}
				this.searchBusinesses(searchFormData, coordinates)
			})
		} else {
			this.locationService.getGoogleMapsGecodedLocation(searchFormData.location).subscribe(data => {
				coordinates = data;
				this.searchBusinesses(searchFormData, coordinates)
			})
		}
	}

	searchBusinesses(searchFormData: SearchData, coordinates: GeocodeResponse) {
		this.yelpService.searchBusinesses(searchFormData.keyword, searchFormData.category, searchFormData.radius, coordinates.latitude, coordinates.longitude).subscribe(
			data => {
				this.showDetails = false;
				this.businesses = data
				if (data.length > 0) {
					this.showNoResultsMessage = false;
				} else {
					this.showNoResultsMessage = true;
					this.onClear()
				}
			}
		)
	}

	onClear = () => {
		this.businesses = [];
		this.selectedBusiness = {
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
		};
	}

	fetchAndShowBusinessDetails = (id: string) => {
		this.yelpService.fetchBusinessDetail(id).subscribe(
			data => {
				this.selectedBusiness = data
				this.showDetails = true				
			}
		)
		
	}

	hideDetails = () => {
		this.showDetails = false
	}
}
