import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesliderComponent } from './packageslider.component';

describe('PackagesliderComponent', () => {
  let component: PackagesliderComponent;
  let fixture: ComponentFixture<PackagesliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagesliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
