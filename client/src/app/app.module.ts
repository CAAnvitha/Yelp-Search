import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { BusinessSearchFormComponent } from './business-search-form/business-search-form.component';
import { BusinessTableComponent } from './business-table/business-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BusinessDetailTabComponent } from './business-detail-tab/business-detail-tab.component';
import { MapTabComponent } from './map-tab/map-tab.component';
import { ReviewsTabComponent } from './reviews-tab/reviews-tab.component'; 
import { GoogleMapsModule } from '@angular/google-maps';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmailValidatorDirective } from './email-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    BusinessSearchFormComponent,
    BusinessTableComponent,
    BusinessDetailComponent,
    BusinessDetailTabComponent,
    MapTabComponent,
    ReviewsTabComponent,
    MyBookingsComponent,
    EmailValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTabsModule,
    GoogleMapsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
