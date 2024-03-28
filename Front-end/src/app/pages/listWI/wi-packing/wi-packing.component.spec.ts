import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiPackingComponent } from './wi-packing.component';

describe('WiPackingComponent', () => {
  let component: WiPackingComponent;
  let fixture: ComponentFixture<WiPackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WiPackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WiPackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
