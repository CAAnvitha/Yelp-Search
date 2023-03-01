import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Business } from 'src/app/interfaces/Business';
import { Review } from 'src/app/interfaces/Review';

@Injectable({
  providedIn: 'root'
})
export class YelpService {

  SERVER_URL = "https://nodeproject098.wl.r.appspot.com//businesses";

  constructor(private httpClient: HttpClient) { }

  searchBusinesses (keyword: string, category: string, radius: number, latitude: string, longitude: string) :Observable<Business[]> {
    radius = radius * 1609.3
    return  this.httpClient.get<Business[]>(this.SERVER_URL.concat(`/search?keyword=${keyword}&latitude=${latitude}&longitude=${longitude}&category=${category}&radius=${radius}`))
  }

  fetchBusinessDetail (id: string): Observable<Business> {
    return this.httpClient.get<Business>(this.SERVER_URL.concat(`/${id}`))
  }

  searchAutocomplete (text: string): Observable<string[]> {
    return this.httpClient.get<string[]>('https://nodeproject098.wl.r.appspot.com/form-util/keyword/autocomplete'.concat(`?text=${text}`))
  }

  // fetchBusinessReviews (id: string) :Observable<Review[]> {
  //   return this.httpClient.get<Review[]>(this.SERVER_URL.concat(`/${id}/reviews`))
  // }

}
