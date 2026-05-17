import { Component, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload';
import { BaseDialog } from '../base/base-dialog';
import { List_Product_Image } from '../../contracts/list_product_image';
import { Product } from '../../services/common/models/product';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogService } from '../../services/common/dialog.service';
import { SpinnerType } from '../../base/base';
import { DeleteDialog, DeleteState } from '../delete-dialog/delete-dialog';
import { ChangeDetectorRef } from '@angular/core';
declare var $: any
@Component({
  selector: 'app-select-product-image-dialog',
  standalone: false,
  templateUrl: './select-product-image-dialog.html',
  styleUrl: './select-product-image-dialog.scss',
})

export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {
 @Output() options: Partial<FileUploadOptions>;
  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: Product,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService,
    private cd: ChangeDetectorRef) {
    super(dialogRef);
   this.options = {
      accept: ".png, .jpg, .jpeg, .gif",
      action: "upload",
      controller: "products",
      explanation: "Ürün resimini seçin veya buraya sürükleyin...",
      isAdminPage: true,
      queryString: `id=${this.data}` 
    };
  }

    

  images: List_Product_Image[]=[];

 async ngOnInit() {
  this.spinner.show(SpinnerType.SquarejellyBox);
  this.images = await this.productService.readImages(this.data as string, () => 
    this.spinner.hide(SpinnerType.SquarejellyBox)
  );
  this.cd.detectChanges(); // 3. Veri geldikten sonra bu satırı ekleyin
}

  async deleteImage(imageId: string, event: any) {

    this.dialogService.openDialog({
      componentType: DeleteDialog,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.SquarejellyBox)
        await this.productService.deleteImage(this.data as string, imageId, () => {
          this.spinner.hide(SpinnerType.SquarejellyBox);
          var card = $(event.srcElement).parent().parent().parent();
          card.fadeOut(500);
        });
      }
    })
  }

  showCase(imageId: string) {
    this.spinner.show(SpinnerType.SquarejellyBox);

    this.productService.changeShowcaseImage(imageId, this.data as string, () => {
      this.spinner.hide(SpinnerType.SquarejellyBox);
    });
  }
}
   

export enum SelectProductImageState {
  Close
}