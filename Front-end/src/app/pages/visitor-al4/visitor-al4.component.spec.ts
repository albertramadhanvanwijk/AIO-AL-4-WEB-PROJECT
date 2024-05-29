import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorAl4Component } from './visitor-al4.component';

describe('VisitorAl4Component', () => {
  let component: VisitorAl4Component;
  let fixture: ComponentFixture<VisitorAl4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorAl4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorAl4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
