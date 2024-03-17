import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartCanComponent } from './add-part-can.component';

describe('AddPartCanComponent', () => {
  let component: AddPartCanComponent;
  let fixture: ComponentFixture<AddPartCanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPartCanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPartCanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
