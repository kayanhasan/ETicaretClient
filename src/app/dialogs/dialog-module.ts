import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material Modülleri
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Kendi Modülleriniz
import { FileUploadModule } from '../services/common/file-upload/file-upload-module';

// Dialog Bileşenleriniz (QrcodeReadingDialog buradaki declarations'tan kaldırıldı!)
import { DeleteDialog } from './delete-dialog/delete-dialog';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog';
import { BasketItemRemoveDialog } from './basket-item-remove-dialog/basket-item-remove-dialog';
import { ShoppingCompleteDialog } from './shopping-complete-dialog/shopping-complete-dialog';
import { OrderDetailDialog } from './order-detail-dialog/order-detail-dialog';
import { CompleteOrderDialog } from './complete-order-dialog/complete-order-dialog';
import { AuthorizeMenuDialog } from './authorize-menu-dialog/authorize-menu-dialog';
import { AuthorizeUserDialog } from './authorize-user-dialog/authorize-user-dialog';
import { QrcodeDialog } from './qrcode-dialog/qrcode-dialog';

@NgModule({
  declarations: [
    DeleteDialog,
    SelectProductImageDialogComponent,
    BasketItemRemoveDialog,
    ShoppingCompleteDialog,
    OrderDetailDialog,
    CompleteOrderDialog,
    AuthorizeMenuDialog,
    AuthorizeUserDialog,
    QrcodeDialog
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatBadgeModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    FileUploadModule,
    MatProgressSpinnerModule
  ],
})
export class DialogModule {}