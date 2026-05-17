import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteOrderDialog } from './complete-order-dialog';

describe('CompleteOrderDialog', () => {
  let component: CompleteOrderDialog;
  let fixture: ComponentFixture<CompleteOrderDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleteOrderDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(CompleteOrderDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
