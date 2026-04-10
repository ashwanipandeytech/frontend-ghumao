import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageenquiryComponent } from './packageenquiry.component';

describe('PackageenquiryComponent', () => {
  let component: PackageenquiryComponent;
  let fixture: ComponentFixture<PackageenquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageenquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageenquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
