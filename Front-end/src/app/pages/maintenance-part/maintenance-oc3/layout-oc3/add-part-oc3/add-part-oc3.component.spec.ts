import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartOc3Component } from './add-part-oc3.component';

describe('AddPartOc3Component', () => {
  let component: AddPartOc3Component;
  let fixture: ComponentFixture<AddPartOc3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPartOc3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPartOc3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
