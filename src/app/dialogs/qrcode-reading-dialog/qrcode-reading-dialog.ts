import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Standalone için eklendi
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog'; // MatDialogModule eklendi
import { MatFormFieldModule } from '@angular/material/form-field'; // HTML'deki mat-form-field için
import { MatInputModule } from '@angular/material/input'; // HTML'deki matInput için
import { MatButtonModule } from '@angular/material/button'; // HTML'deki mat-button için
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/cutom-toastr';
import { Product } from '../../services/common/models/product';
import { SpinnerType } from '../../base/base';

// Kütüphaneyi doğrudan bileşenin kendisine bağlıyoruz
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode'; 

declare var $: any;

@Component({
  selector: 'app-qrcode-reading-dialog',
  standalone: true, // Bileşeni standalone yaptık!
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    NgxScannerQrcodeComponent // Tarayıcı bileşeni buraya eklendi
  ],
  templateUrl: './qrcode-reading-dialog.html',
  styleUrl: './qrcode-reading-dialog.scss',
})
export class QrcodeReadingDialog extends BaseDialog<QrcodeReadingDialog> implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    dialogRef: MatDialogRef<QrcodeReadingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private spinner: NgxSpinnerService,
    private toastrService: CustomToastrService,
    private productService: Product
  ) {
    super(dialogRef);
  }

  @ViewChild("scanner", { static: false }) scanner: NgxScannerQrcodeComponent;
  @ViewChild("txtStock", { static: false }) txtStock: ElementRef;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.scanner) {
      this.scanner.start(); 
    }
  }

  ngOnDestroy(): void {
    if (this.scanner) {
      this.scanner.stop(); 
    }
  }

  onEvent(e: any) {
    // 1. Gelen verinin bir dizi olduğunu ve boş olmadığını doğrula
    if (!e || e.length === 0) return;

    // Log çıktısına göre tüm detaylar dizinin ilk elemanında (0. indeks) yer alıyor
    const qrObject = e[0]; 

    // 2. qrObject içindeki 'value' alanını kontrol ediyoruz
    if (qrObject && qrObject.value) {
      
      // Üst üste tetiklenmeyi önlemek için ilk başarılı okumada kamerayı durduruyoruz
      if (this.scanner) {
        this.scanner.stop();
      }

      this.spinner.show(SpinnerType.SquarejellyBox);

      try {
        // qrObject.value içindeki string JSON'ı ayrıştırıyoruz
        const jsonData = JSON.parse(qrObject.value);
        
        // Input alanındaki güncel stok miktarını alıyoruz
        const stockValue = (this.txtStock.nativeElement as HTMLInputElement).value;

        // Servis çağrısı ile veritabanını güncelleme
        this.productService.updateStockQrCodeToProduct(jsonData.Id, parseInt(stockValue), () => {
          
          // İşlem başarılı olunca dialog kapatma butonunu tetikle
          $("#btnClose").click();
          
          this.toastrService.message(
            `${jsonData.Name} ürününün stok bilgisi '${stockValue}' olarak güncellenmiştir.`, 
            "Stok Başarıyla Güncellendi", 
            {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight
            }
          );

          this.spinner.hide(SpinnerType.SquarejellyBox);
        });

      } catch (error) {
        console.error("QR verisi parse edilirken hata oluştu:", error);
        this.spinner.hide(SpinnerType.SquarejellyBox);
        
        // Eğer JSON parse aşamasında anlık hatalı bir okuma olduysa kamerayı tekrar dinlemeye al
        if (this.scanner) {
          this.scanner.start();
        }
      }
    }
  }
}