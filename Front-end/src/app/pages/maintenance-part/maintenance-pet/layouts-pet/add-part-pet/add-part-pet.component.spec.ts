import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartPetComponent } from './add-part-pet.component';

describe('AddPartPetComponent', () => {
  let component: AddPartPetComponent;
  let fixture: ComponentFixture<AddPartPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPartPetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPartPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
