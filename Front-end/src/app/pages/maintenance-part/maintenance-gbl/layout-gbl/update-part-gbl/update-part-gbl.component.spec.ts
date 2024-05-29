import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePartGblComponent } from './update-part-gbl.component';

describe('UpdatePartGblComponent', () => {
  let component: UpdatePartGblComponent;
  let fixture: ComponentFixture<UpdatePartGblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePartGblComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePartGblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
