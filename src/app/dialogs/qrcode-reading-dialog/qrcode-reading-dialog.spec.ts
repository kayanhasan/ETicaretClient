import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeReadingDialog } from './qrcode-reading-dialog';

describe('QrcodeReadingDialog', () => {
  let component: QrcodeReadingDialog;
  let fixture: ComponentFixture<QrcodeReadingDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QrcodeReadingDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(QrcodeReadingDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
