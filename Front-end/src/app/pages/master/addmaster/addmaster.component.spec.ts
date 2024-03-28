import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmasterComponent } from './addmaster.component';

describe('AddmasterComponent', () => {
  let component: AddmasterComponent;
  let fixture: ComponentFixture<AddmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
