import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOutputPetComponent } from './add-output-pet.component';

describe('AddOutputPetComponent', () => {
  let component: AddOutputPetComponent;
  let fixture: ComponentFixture<AddOutputPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOutputPetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOutputPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
