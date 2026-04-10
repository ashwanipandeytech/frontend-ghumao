import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagegroupComponent } from './packagegroup.component';

describe('PackagegroupComponent', () => {
  let component: PackagegroupComponent;
  let fixture: ComponentFixture<PackagegroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagegroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
