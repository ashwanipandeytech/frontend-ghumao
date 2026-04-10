import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePackagetypesComponent } from './manage-packagetypes.component';

describe('ManagePackagetypesComponent', () => {
  let component: ManagePackagetypesComponent;
  let fixture: ComponentFixture<ManagePackagetypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePackagetypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePackagetypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
