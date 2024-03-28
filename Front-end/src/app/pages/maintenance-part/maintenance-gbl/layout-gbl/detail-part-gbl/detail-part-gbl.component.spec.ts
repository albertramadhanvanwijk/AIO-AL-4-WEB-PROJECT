import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPartGblComponent } from './detail-part-gbl.component';

describe('DetailPartGblComponent', () => {
  let component: DetailPartGblComponent;
  let fixture: ComponentFixture<DetailPartGblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPartGblComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPartGblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
