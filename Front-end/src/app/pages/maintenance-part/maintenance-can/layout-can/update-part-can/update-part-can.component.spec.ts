import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePartCanComponent } from './update-part-can.component';

describe('UpdatePartCanComponent', () => {
  let component: UpdatePartCanComponent;
  let fixture: ComponentFixture<UpdatePartCanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePartCanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePartCanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
