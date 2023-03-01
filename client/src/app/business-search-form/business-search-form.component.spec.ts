import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSearchFormComponent } from './business-search-form.component';

describe('BusinessSearchFormComponent', () => {
  let component: BusinessSearchFormComponent;
  let fixture: ComponentFixture<BusinessSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessSearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
