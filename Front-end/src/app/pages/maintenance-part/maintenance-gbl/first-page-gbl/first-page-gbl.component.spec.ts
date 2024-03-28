import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPageGblComponent } from './first-page-gbl.component';

describe('FirstPageGblComponent', () => {
  let component: FirstPageGblComponent;
  let fixture: ComponentFixture<FirstPageGblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstPageGblComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstPageGblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
