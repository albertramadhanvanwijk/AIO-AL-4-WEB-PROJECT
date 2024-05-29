import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizMasterListComponent } from './quiz-master-list.component';

describe('QuizMasterListComponent', () => {
  let component: QuizMasterListComponent;
  let fixture: ComponentFixture<QuizMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizMasterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
