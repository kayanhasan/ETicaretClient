import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeDialog } from './qrcode-dialog';

describe('QrcodeDialog', () => {
  let component: QrcodeDialog;
  let fixture: ComponentFixture<QrcodeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QrcodeDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(QrcodeDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
