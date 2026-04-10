import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAddpackagetypeComponent } from './manage-addpackagetype.component';

describe('ManageAddpackagetypeComponent', () => {
  let component: ManageAddpackagetypeComponent;
  let fixture: ComponentFixture<ManageAddpackagetypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAddpackagetypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAddpackagetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
