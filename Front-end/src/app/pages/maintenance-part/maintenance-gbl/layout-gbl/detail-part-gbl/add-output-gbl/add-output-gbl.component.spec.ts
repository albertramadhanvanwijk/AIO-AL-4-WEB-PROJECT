import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOutputGblComponent } from './add-output-gbl.component';

describe('AddOutputGblComponent', () => {
  let component: AddOutputGblComponent;
  let fixture: ComponentFixture<AddOutputGblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOutputGblComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOutputGblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
