import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../../../../services/common/models/product';
import { Create_Product } from '../../../../contracts/create_product';
import { Base, SpinnerType } from '../../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { Alertify, MessageType, Position } from '../../../../services/admin/alertify';


@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class Create extends Base{

   constructor(private productService:Product,spiner:NgxSpinnerService,private alertify:Alertify) {
    super(spiner);
   }
   @Output() createdProduct:EventEmitter<Create_Product>=new EventEmitter();

   create(name:HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement){
     this.showSpinner(SpinnerType.SquarejellyBox);
     const create_product:Create_Product=new Create_Product();
     create_product.name=name.value;
     create_product.stock=parseInt(stock.value);
     create_product.price=parseFloat(price.value);

     this.productService.create(create_product,()=>{
      this.hideSpinner(SpinnerType.SquarejellyBox);
      this.alertify.message("Ürün Başarıyla Eklendi.",{
      dismissOthers:true,
      messageType:MessageType.Success,
      position:Position.TopRight
     });
     this.createdProduct.emit(create_product);
   },errorMessage=>{
    this.alertify.message(errorMessage,{
      dismissOthers:true,
      messageType:MessageType.Error,
      position:Position.TopRight
    });
   });
  }
}
