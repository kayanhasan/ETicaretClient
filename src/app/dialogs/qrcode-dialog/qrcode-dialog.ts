import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. ChangeDetectorRef eklendi
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { QrCodeService } from '../../services/common/qr-code.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SpinnerType } from '../../base/base';

@Component({
  selector: 'app-qrcode-dialog',
  standalone: false,
  templateUrl: './qrcode-dialog.html',
  styleUrl: './qrcode-dialog.scss',
})
export class QrcodeDialog extends BaseDialog<QrcodeDialog> implements OnInit {
  constructor(
    dialogRef: MatDialogRef<QrcodeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private spinner: NgxSpinnerService,
    private qrCodeService: QrCodeService,
    private domSanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef // 2. Constructor'a inject edildi
  ) {
    super(dialogRef)
  }

  qrCodeSafeUrl: SafeUrl;

  async ngOnInit() {
    this.spinner.show(SpinnerType.SquarejellyBox);
    try {
      const qrCodeBlob: Blob = await this.qrCodeService.generateQRCode(this.data);
      const url: string = URL.createObjectURL(qrCodeBlob);
      this.qrCodeSafeUrl = this.domSanitizer.bypassSecurityTrustUrl(url);
    } catch (error) {
      console.error("QR Kod üretilirken hata oluştu:", error);
    } finally {
      this.spinner.hide(SpinnerType.SquarejellyBox);
      
      // 3. Asenkron işlem bitti, Angular'ı el ile haberdar edip NG0100'ü engelliyoruz
      this.cdr.detectChanges(); 
    }
  }
}