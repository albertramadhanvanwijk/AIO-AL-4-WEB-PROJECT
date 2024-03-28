import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartEnmixComponent } from './add-part-enmix.component';

describe('AddPartEnmixComponent', () => {
  let component: AddPartEnmixComponent;
  let fixture: ComponentFixture<AddPartEnmixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPartEnmixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPartEnmixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
