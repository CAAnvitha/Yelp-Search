import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, finalize, map, Observable, OperatorFunction, switchMap, tap } from 'rxjs';
import { SearchData } from '../interfaces/SearchData';
import { YelpService } from '../services/yelp/yelp.service';

@Component({
  selector: 'app-business-search-form',
  templateUrl: './business-search-form.component.html',
  styleUrls: ['./business-search-form.component.css']
})
export class BusinessSearchFormComponent implements OnInit {

  Categories = [
    { value: 'all', label: 'Default'},
    { value: 'artsAndEntertainment', label: 'Arts & Entertainment'},
    { value: 'healthAndMedical', label: 'Health & Medical'},
    { value: 'hotelsAndTravel', label: 'Hotels & Travel'},
    { value: 'food', label: 'Food'},
    { value: 'professionalServices', label: 'Professional Services'}
  ];

  searchKeywordCtrl = new FormControl();
  filteredKeywords: any;
  isLoading = false;
  minLengthTerm = 1;
  selectedKeyword: any = "";
  searchData = new SearchData('', 10, 'all', '', false);

  constructor(private yelpService: YelpService) { }

  @Input() onClear!: () => void;

  ngOnInit(): void {
    this.searchKeywordCtrl.valueChanges
      .pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => {
          this.filteredKeywords = [];
          this.isLoading = true;
        }),
        switchMap(value => this.yelpService.searchAutocomplete(value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((data: any) => {
        if (data['terms'] == undefined) {
          this.filteredKeywords = [];
        } else {
          this.filteredKeywords = data['terms'].map((entry: { text: string; }) => entry.text);
        }
      });
  }

  onSelected() {
    this.searchData.keyword = this.searchData.keyword;
  }

  displayWith(value: any) {
    return value;
  }

  @Output() searchFormData = new EventEmitter<SearchData>();

  onSubmit() { 
    this.searchFormData.emit(this.searchData);
  }

  clear () {
    this.onClear()
    this.searchData = new SearchData('', 10, 'all', '', false);
  }
}
