import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPagePetComponent } from './first-page-pet.component';

describe('FirstPagePetComponent', () => {
  let component: FirstPagePetComponent;
  let fixture: ComponentFixture<FirstPagePetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstPagePetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstPagePetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
