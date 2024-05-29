import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePartEnmixComponent } from './update-part-enmix.component';

describe('UpdatePartEnmixComponent', () => {
  let component: UpdatePartEnmixComponent;
  let fixture: ComponentFixture<UpdatePartEnmixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePartEnmixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePartEnmixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
