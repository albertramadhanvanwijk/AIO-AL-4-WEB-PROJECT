import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceOc3Component } from './maintenance-oc3.component';

describe('MaintenanceOc3Component', () => {
  let component: MaintenanceOc3Component;
  let fixture: ComponentFixture<MaintenanceOc3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceOc3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceOc3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
