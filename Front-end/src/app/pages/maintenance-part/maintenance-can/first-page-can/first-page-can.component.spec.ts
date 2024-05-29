import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPageCanComponent } from './first-page-can.component';

describe('FirstPageCanComponent', () => {
  let component: FirstPageCanComponent;
  let fixture: ComponentFixture<FirstPageCanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstPageCanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstPageCanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
