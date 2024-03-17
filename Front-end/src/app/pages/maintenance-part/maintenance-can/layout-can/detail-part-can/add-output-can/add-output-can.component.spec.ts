import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOutputCanComponent } from './add-output-can.component';

describe('AddOutputCanComponent', () => {
  let component: AddOutputCanComponent;
  let fixture: ComponentFixture<AddOutputCanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOutputCanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOutputCanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
