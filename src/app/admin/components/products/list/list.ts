import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { List_Product } from '../../../../contracts/list_product';
import { Product } from '../../../../services/common/models/product';
import { Base, SpinnerType } from '../../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { Alertify, MessageType, Position } from '../../../../services/admin/alertify';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from '../../../../services/common/dialog.service';
import { SelectProductImageDialogComponent } from '../../../../dialogs/select-product-image-dialog/select-product-image-dialog';
import { QrcodeDialog } from '../../../../dialogs/qrcode-dialog/qrcode-dialog';


declare var $:any;

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List extends Base implements OnInit {

  constructor(
    spinner: NgxSpinnerService,
    private productService: Product,
    private alertifyService: Alertify,
     private dialogService: DialogService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate','photos', 'qrcode','edit','delete'];
  dataSource: MatTableDataSource<List_Product> = null;
   @ViewChild(MatPaginator) paginator!: MatPaginator;

  async getProducts(){
    this.showSpinner(SpinnerType.SquarejellyBox); 
    const allProducts:{totalProductCount:number,products:List_Product[]}=await this.productService.read(this.paginator?this.paginator.pageIndex:0,this.paginator?this.paginator.pageSize:5,()=>this.hideSpinner(SpinnerType.SquarejellyBox),errorMessage=>
      this.alertifyService.message("Ürün Listeleme Başarısız",{
        dismissOthers:true,
        messageType:MessageType.Error,
        position:Position.TopRight,

      }))
      
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length=allProducts.totalProductCount;
  }

 
 addProductImages(id: string) {
    this.dialogService.openDialog({
      componentType: SelectProductImageDialogComponent,
      data: id,
      options: {
        width: "1400px"
      }
    });
  }


  async pageChanged(){
await this.getProducts();
  }
  async ngOnInit() {
    await this.getProducts();
  }
showQRCode(productId: string) {
    this.dialogService.openDialog({
      componentType: QrcodeDialog,
      data: productId,
      afterClosed: () => { }
    })
  }
   

}