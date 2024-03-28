import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPartOc3Component } from './detail-part-oc3.component';

describe('DetailPartOc3Component', () => {
  let component: DetailPartOc3Component;
  let fixture: ComponentFixture<DetailPartOc3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPartOc3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPartOc3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
