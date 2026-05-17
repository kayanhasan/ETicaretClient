import { Component, ViewChild } from '@angular/core';
import { Base, SpinnerType } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client-service';
import { Create_Product } from '../../../contracts/create_product';
import { List } from './list/list';
import { DialogService } from '../../../services/common/dialog.service';
import { QrcodeReadingDialog } from '../../../dialogs/qrcode-reading-dialog/qrcode-reading-dialog';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products  extends Base {
   constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService, private dialogService: DialogService) {
    super(spinner)
  }

  @ViewChild(List) list:List
  createdProduct(create_product:Create_Product){
    this.list.getProducts();
  }

  showProductQrCodeReading() {
    this.dialogService.openDialog({
      componentType: QrcodeReadingDialog,
      data: null,
      options: {
        width: "1000px"
      },
      afterClosed: () => { }
    });
  }
}
