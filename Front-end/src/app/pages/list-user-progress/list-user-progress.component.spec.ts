import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserProgressComponent } from './list-user-progress.component';

describe('ListUserProgressComponent', () => {
  let component: ListUserProgressComponent;
  let fixture: ComponentFixture<ListUserProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUserProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
