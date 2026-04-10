import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquirymodalComponent } from './enquirymodal.component';

describe('EnquirymodalComponent', () => {
  let component: EnquirymodalComponent;
  let fixture: ComponentFixture<EnquirymodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquirymodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquirymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
