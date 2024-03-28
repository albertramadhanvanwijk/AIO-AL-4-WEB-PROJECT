import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPageEnmixComponent } from './first-page-enmix.component';

describe('FirstPageEnmixComponent', () => {
  let component: FirstPageEnmixComponent;
  let fixture: ComponentFixture<FirstPageEnmixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstPageEnmixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstPageEnmixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
