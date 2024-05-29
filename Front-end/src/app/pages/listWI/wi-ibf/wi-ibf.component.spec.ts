import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiIBFComponent } from './wi-ibf.component';

describe('WiIBFComponent', () => {
  let component: WiIBFComponent;
  let fixture: ComponentFixture<WiIBFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WiIBFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WiIBFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
