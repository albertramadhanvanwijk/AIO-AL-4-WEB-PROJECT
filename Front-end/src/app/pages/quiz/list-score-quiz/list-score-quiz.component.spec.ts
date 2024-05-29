import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListScoreQuizComponent } from './list-score-quiz.component';

describe('ListScoreQuizComponent', () => {
  let component: ListScoreQuizComponent;
  let fixture: ComponentFixture<ListScoreQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListScoreQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListScoreQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
