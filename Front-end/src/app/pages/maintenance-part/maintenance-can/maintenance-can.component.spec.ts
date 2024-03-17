import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceCanComponent } from './maintenance-can.component';

describe('MaintenanceCanComponent', () => {
  let component: MaintenanceCanComponent;
  let fixture: ComponentFixture<MaintenanceCanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceCanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceCanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
