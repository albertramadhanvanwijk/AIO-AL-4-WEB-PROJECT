import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsupplyComponent } from './editsupply.component';

describe('EditsupplyComponent', () => {
  let component: EditsupplyComponent;
  let fixture: ComponentFixture<EditsupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditsupplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditsupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
