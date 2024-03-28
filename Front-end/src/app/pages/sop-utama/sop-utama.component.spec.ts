import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SopUtamaComponent } from './sop-utama.component';

describe('SopUtamaComponent', () => {
  let component: SopUtamaComponent;
  let fixture: ComponentFixture<SopUtamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SopUtamaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SopUtamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
