import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTransactionPartComponent } from './update-transaction-part.component';

describe('UpdateTransactionPartComponent', () => {
  let component: UpdateTransactionPartComponent;
  let fixture: ComponentFixture<UpdateTransactionPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTransactionPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTransactionPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
