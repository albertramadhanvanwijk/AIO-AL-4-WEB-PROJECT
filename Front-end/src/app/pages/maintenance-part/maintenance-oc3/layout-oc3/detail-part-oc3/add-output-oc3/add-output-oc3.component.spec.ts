import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOutputOc3Component } from './add-output-oc3.component';

describe('AddOutputOc3Component', () => {
  let component: AddOutputOc3Component;
  let fixture: ComponentFixture<AddOutputOc3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOutputOc3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOutputOc3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
