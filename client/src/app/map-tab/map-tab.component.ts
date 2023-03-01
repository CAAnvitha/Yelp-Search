import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { GeocodeResponse } from '../services/location/location.service';

@Component({
  selector: 'app-map-tab',
  templateUrl: './map-tab.component.html',
  styleUrls: ['./map-tab.component.css']
})
export class MapTabComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() coordinates = new GeocodeResponse('0', '0')

  marker = {
    position: { lat: parseFloat(this.coordinates.latitude), lng: parseFloat(this.coordinates.longitude) },
  }

  mapOptions: google.maps.MapOptions = {
      center: { lat: parseFloat(this.coordinates.latitude), lng: parseFloat(this.coordinates.longitude) },
      zoom : 15
  }

  ngOnChanges(changes: SimpleChanges) {
    this.marker = {
      position: { lat: parseFloat(changes['coordinates'].currentValue.latitude), lng: parseFloat(changes['coordinates'].currentValue.longitude) },
    }
    this.mapOptions = {
      center: { lat: parseFloat(changes['coordinates'].currentValue.latitude), lng: parseFloat(changes['coordinates'].currentValue.longitude) },
      zoom : 15
    }
  }
  
}
