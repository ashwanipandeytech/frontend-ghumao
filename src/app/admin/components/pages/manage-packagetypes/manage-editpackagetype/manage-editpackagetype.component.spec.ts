import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEditpackagetypeComponent } from './manage-editpackagetype.component';

describe('ManageEditpackagetypeComponent', () => {
  let component: ManageEditpackagetypeComponent;
  let fixture: ComponentFixture<ManageEditpackagetypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEditpackagetypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEditpackagetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
