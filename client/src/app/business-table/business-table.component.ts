import { Component, Input, OnInit } from '@angular/core';
import { Business } from '../interfaces/Business';

@Component({
  selector: 'app-business-table',
  templateUrl: './business-table.component.html',
  styleUrls: ['./business-table.component.css']
})
export class BusinessTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() businesses: Business[] = [];
  @Input() onBusinessRowClick!: (id: string) => void;

  onRowClick (id: string) {
    this.onBusinessRowClick(id)
  }

  roundOff(value: any) {
    return Math.round(value * 0.00062)
  }

}
