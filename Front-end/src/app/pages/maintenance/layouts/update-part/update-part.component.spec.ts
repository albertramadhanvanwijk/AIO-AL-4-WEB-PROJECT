import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePartComponent } from './update-part.component';

describe('UpdatePartComponent', () => {
  let component: UpdatePartComponent;
  let fixture: ComponentFixture<UpdatePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
