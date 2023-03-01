import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDetailTabComponent } from './business-detail-tab.component';

describe('BusinessDetailTabComponent', () => {
  let component: BusinessDetailTabComponent;
  let fixture: ComponentFixture<BusinessDetailTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessDetailTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessDetailTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
