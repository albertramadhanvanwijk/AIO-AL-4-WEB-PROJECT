import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPageOc3Component } from './first-page-oc3.component';

describe('FirstPageOc3Component', () => {
  let component: FirstPageOc3Component;
  let fixture: ComponentFixture<FirstPageOc3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstPageOc3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstPageOc3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
