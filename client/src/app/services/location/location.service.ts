import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

class IpInfoResponse {
  constructor(
    public loc: string
  ) {}
}

export class GeocodeResponse {
  constructor (
    public latitude: string,
    public longitude: string
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) { }

  getIpInfoLocation ()  {
    return this.httpClient.get<IpInfoResponse>('https://ipinfo.io/?token=f6611e3e57264f').pipe(
      catchError(error => {
        console.log(error);
        return of(null);
      })
    )
  }

  getGoogleMapsGecodedLocation (address: string) {
    return this.httpClient.get<GeocodeResponse>(`https://nodeproject098.wl.r.appspot.com/google-maps/geocode?address=${address}`).pipe(
      catchError(error => {
        console.log(error);
        return of(new GeocodeResponse('', ''));
      })
    )
  }

}
