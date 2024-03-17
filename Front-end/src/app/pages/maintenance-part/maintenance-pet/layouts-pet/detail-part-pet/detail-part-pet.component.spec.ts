import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPartPetComponent } from './detail-part-pet.component';

describe('DetailPartPetComponent', () => {
  let component: DetailPartPetComponent;
  let fixture: ComponentFixture<DetailPartPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPartPetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPartPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
