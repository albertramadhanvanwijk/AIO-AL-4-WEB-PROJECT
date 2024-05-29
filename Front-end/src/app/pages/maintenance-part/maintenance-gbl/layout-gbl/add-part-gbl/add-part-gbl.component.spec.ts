import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartGblComponent } from './add-part-gbl.component';

describe('AddPartGblComponent', () => {
  let component: AddPartGblComponent;
  let fixture: ComponentFixture<AddPartGblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPartGblComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPartGblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
