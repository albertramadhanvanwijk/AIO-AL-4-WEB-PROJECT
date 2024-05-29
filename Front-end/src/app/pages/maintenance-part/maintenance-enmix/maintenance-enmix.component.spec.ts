import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceEnmixComponent } from './maintenance-enmix.component';

describe('MaintenanceEnmixComponent', () => {
  let component: MaintenanceEnmixComponent;
  let fixture: ComponentFixture<MaintenanceEnmixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceEnmixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceEnmixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
