import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceGblComponent } from './maintenance-gbl.component';

describe('MaintenanceGblComponent', () => {
  let component: MaintenanceGblComponent;
  let fixture: ComponentFixture<MaintenanceGblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceGblComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceGblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
