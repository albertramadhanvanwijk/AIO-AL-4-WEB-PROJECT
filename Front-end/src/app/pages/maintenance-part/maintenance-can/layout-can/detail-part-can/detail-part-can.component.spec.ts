import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPartCanComponent } from './detail-part-can.component';

describe('DetailPartCanComponent', () => {
  let component: DetailPartCanComponent;
  let fixture: ComponentFixture<DetailPartCanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPartCanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPartCanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
