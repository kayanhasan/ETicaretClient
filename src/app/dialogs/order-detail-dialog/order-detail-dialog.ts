import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Base, SpinnerType } from '../../base/base';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../services/common/models/orderservice';
import { DialogService } from '../../services/common/dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/cutom-toastr';
import { SingleOrder } from '../../contracts/order/single_order';
import { CompleteOrderDialog, CompleteOrderState } from '../complete-order-dialog/complete-order-dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-order-detail-dialog',
  standalone: false,
  templateUrl: './order-detail-dialog.html',
  styleUrl: './order-detail-dialog.scss',
})
export class OrderDetailDialog extends BaseDialog<OrderDetailDialog> implements OnInit {
  constructor(
    dialogRef: MatDialogRef<OrderDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
    private orderService: OrderService,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService,
    private toastrService: CustomToastrService,
    private cdr: ChangeDetectorRef // Değişiklikleri manuel tetiklemek için eklendi
  ) {
    super(dialogRef);
  }

  singleOrder: SingleOrder;
  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice: number = 0;

  async ngOnInit(): Promise<void> {
    // Veri yüklenirken kullanıcıya görsel geri bildirim veriyoruz
    this.spinner.show(SpinnerType.SquarejellyBox);

    try {
      this.singleOrder = await this.orderService.getOrderById(this.data as string);

      if (this.singleOrder && this.singleOrder.basketItems) {
        this.dataSource = this.singleOrder.basketItems;

        // Reduce işlemine , 0 ekleyerek boş dizi hatalarını önledik
        this.totalPrice = this.singleOrder.basketItems
          .map(basketItem => basketItem.price * basketItem.quantity)
          .reduce((price, current) => price + current, 0);
      }
    } finally {
      this.spinner.hide(SpinnerType.SquarejellyBox);
      // Asenkron veri geldikten sonra UI'ın güncellendiğinden emin oluyoruz
      this.cdr.detectChanges();
    }
  }

  completeOrder() {
    this.dialogService.openDialog({
      componentType: CompleteOrderDialog,
      data: CompleteOrderState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.SquarejellyBox);
        try {
          await this.orderService.completeOrder(this.data as string);
          
          this.toastrService.message("Sipariş başarıyla tamamlanmıştır! Müşteriye bilgi verilmiştir.", "Sipariş Tamamlandı!", {
            messageType: ToastrMessageType.Success,
            position: ToastrPosition.TopRight
          });
          
          // Sipariş tamamlandığı için dialogu kapatabilir veya veriyi güncelleyebilirsiniz
          this.dialogRef.close(OrderDetailDialogState.OrderComplete);
        } catch (error) {
          console.error("Sipariş tamamlama hatası:", error);
        } finally {
          this.spinner.hide(SpinnerType.SquarejellyBox);
        }
      }
    });
  }
}

export enum OrderDetailDialogState {
  Close, OrderComplete
}