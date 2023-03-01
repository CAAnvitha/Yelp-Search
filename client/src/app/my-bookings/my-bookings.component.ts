import { Component, OnInit } from '@angular/core';
import { ReservationData } from '../interfaces/ReservationData';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  constructor() { }

  reservations: ReservationData[] = []

  ngOnInit(): void {
    let reservationsData = JSON.parse(localStorage.getItem('reservations')!);
    if (reservationsData) {
      Object.values(reservationsData).forEach(reservation => this.reservations.push(Object.assign(new ReservationData(), reservation)))
    }
  }

  onCancelReservation (id: string) {
    let reservationsData = JSON.parse(localStorage.getItem('reservations')!);
		if (reservationsData && reservationsData[id]) {
			delete reservationsData[id];
			localStorage.setItem('reservations', JSON.stringify(reservationsData));
			alert('Reservation cancelled!')
      this.reservations = this.reservations.filter(reservation => reservation.id !== id);
		}
  }

}
