import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFilterSuppliesComponent } from './view-filter-supplies.component';

describe('ViewFilterSuppliesComponent', () => {
  let component: ViewFilterSuppliesComponent;
  let fixture: ComponentFixture<ViewFilterSuppliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFilterSuppliesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFilterSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
