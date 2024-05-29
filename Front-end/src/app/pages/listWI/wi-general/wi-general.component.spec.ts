import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiGeneralComponent } from './wi-general.component';

describe('WiGeneralComponent', () => {
  let component: WiGeneralComponent;
  let fixture: ComponentFixture<WiGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WiGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WiGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
