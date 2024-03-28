import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePartOc3Component } from './update-part-oc3.component';

describe('UpdatePartOc3Component', () => {
  let component: UpdatePartOc3Component;
  let fixture: ComponentFixture<UpdatePartOc3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePartOc3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePartOc3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
