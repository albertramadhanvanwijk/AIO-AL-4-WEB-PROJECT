import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmasterComponent } from './editmaster.component';

describe('EditmasterComponent', () => {
  let component: EditmasterComponent;
  let fixture: ComponentFixture<EditmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
