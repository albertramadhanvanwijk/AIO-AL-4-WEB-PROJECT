import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPartEnmixComponent } from './detail-part-enmix.component';

describe('DetailPartEnmixComponent', () => {
  let component: DetailPartEnmixComponent;
  let fixture: ComponentFixture<DetailPartEnmixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPartEnmixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPartEnmixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
