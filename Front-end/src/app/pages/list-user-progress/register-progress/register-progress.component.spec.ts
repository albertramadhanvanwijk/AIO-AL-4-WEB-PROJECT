import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProgressComponent } from './register-progress.component';

describe('RegisterProgressComponent', () => {
  let component: RegisterProgressComponent;
  let fixture: ComponentFixture<RegisterProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
