import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenancePetComponent } from './maintenance-pet.component';

describe('MaintenancePetComponent', () => {
  let component: MaintenancePetComponent;
  let fixture: ComponentFixture<MaintenancePetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenancePetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenancePetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
