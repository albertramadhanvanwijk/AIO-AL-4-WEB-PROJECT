import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePartPetComponent } from './update-part-pet.component';

describe('UpdatePartPetComponent', () => {
  let component: UpdatePartPetComponent;
  let fixture: ComponentFixture<UpdatePartPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePartPetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePartPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
