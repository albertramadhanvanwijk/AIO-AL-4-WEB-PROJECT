import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOutputEnmixComponent } from './add-output-enmix.component';

describe('AddOutputEnmixComponent', () => {
  let component: AddOutputEnmixComponent;
  let fixture: ComponentFixture<AddOutputEnmixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOutputEnmixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOutputEnmixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
