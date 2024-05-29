import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiPreparasiComponent } from './wi-preparasi.component';

describe('WiPreparasiComponent', () => {
  let component: WiPreparasiComponent;
  let fixture: ComponentFixture<WiPreparasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WiPreparasiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WiPreparasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
