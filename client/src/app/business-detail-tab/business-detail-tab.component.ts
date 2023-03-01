import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Business } from '../interfaces/Business';
import { ReservationData } from '../interfaces/ReservationData';
import { GeocodeResponse } from '../services/location/location.service';

@Component({
  selector: 'app-business-detail-tab',
  templateUrl: './business-detail-tab.component.html',
  styleUrls: ['./business-detail-tab.component.css']
})
export class BusinessDetailTabComponent implements OnInit {

	hours = ['10', '11', '12', '13', '14', '15', '16', '17']
	mins = ['00', '15', '30', '45']
	reservationData = new ReservationData('', '', '', '', '', '')
	showReserveButton: boolean = true
	twitterShareUrl: string = ""
	facebookShareUrl: string = ""

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

	constructor(private modalService: NgbModal) { }

	ngOnInit(): void {
		let reservationsData = JSON.parse(localStorage.getItem('reservations')!);
		if (reservationsData && reservationsData[this.business.id]) {
			this.showReserveButton = false
		}

		let shareQuote = encodeURIComponent("Check " + this.business.name + " on Yelp.");
		let shareUrl = encodeURIComponent(this.business.url);
		this.twitterShareUrl = "https://twitter.com/intent/tweet?text=" + shareQuote + "&url=" + shareUrl; 
		this.facebookShareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + shareUrl + "&quote=" + shareQuote;
	}

	open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}

	onReserve() {
		this.reservationData.id = this.business.id;
		this.reservationData.businessName = this.business.name;
		let reservations = JSON.parse(localStorage.getItem("reservations")!);
		if (!reservations) {
			reservations = {};
		}
		reservations[this.reservationData.id] = this.reservationData;
		localStorage.setItem("reservations", JSON.stringify(reservations));
		alert('Reservation created!')
		this.modalService.dismissAll();
		this.showReserveButton = false;
	}

	onCancelReserve() {
		let reservationsData = JSON.parse(localStorage.getItem('reservations')!);
		if (reservationsData && reservationsData[this.business.id]) {
			delete reservationsData[this.business.id];
			localStorage.setItem('reservations', JSON.stringify(reservationsData));
			alert('Reservation cancelled!')
			this.showReserveButton = true;
		}
	}

	getCurrentDate() {
		let date = new Date()
		let day = date.getDate();
		let month = date.getMonth() + 1;
		let year = date.getFullYear();

		let dayString = day.toString()
		if (day < 10) {
			dayString = '0' + dayString;
		}

		let monthString = month.toString();
		if (month < 10) {
			monthString = '0' + monthString;
		}
		return year + '-' + monthString + '-' + dayString ;
	}
}
