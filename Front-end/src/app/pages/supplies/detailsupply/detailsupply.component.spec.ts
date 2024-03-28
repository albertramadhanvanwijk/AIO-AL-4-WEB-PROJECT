import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSupplyComponent } from './detailsupply.component';

describe('DetailsupplyComponent', () => {
  let component: DetailSupplyComponent;
  let fixture: ComponentFixture<DetailSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSupplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
