import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Base, SpinnerType } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { BasketService } from '../../../services/common/models/basketservice';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/cutom-toastr';
import { Router } from '@angular/router';
import { DialogService } from '../../../services/common/dialog.service';
import { OrderService } from '../../../services/common/models/orderservice';
import { List_Basket_Item } from '../../../contracts/basket/list_basket_item';
import { Update_Basket_Item } from '../../../contracts/basket/update_basket_item';
import { Create_Order } from '../../../contracts/order/create_order';
import { BasketItemDeleteState, BasketItemRemoveDialog } from '../../../dialogs/basket-item-remove-dialog/basket-item-remove-dialog';
import { ShoppingCompleteDialog, ShoppingCompleteState } from '../../../dialogs/shopping-complete-dialog/shopping-complete-dialog';

declare var $: any;

@Component({
  selector: 'app-baskets',
  standalone: false,
  templateUrl: './baskets.html',
  styleUrl: './baskets.scss',
})
export class Baskets extends Base implements OnInit {
   constructor(spinner: NgxSpinnerService, private basketService: BasketService, private orderService: OrderService, private toastrService: CustomToastrService, private router: Router, private dialogService: DialogService,private cdr: ChangeDetectorRef) {
    super(spinner)
  }
   basketItems: List_Basket_Item[];
  
  async ngOnInit(): Promise<void> {
    this.showSpinner(SpinnerType.SquarejellyBox)
    this.basketItems = await this.basketService.get()
    this.hideSpinner(SpinnerType.SquarejellyBox)
    this.cdr.detectChanges();
  }
  async changeQuantity(object: any) {
    this.showSpinner(SpinnerType.SquarejellyBox)
    const basketItemId: string = object.target.getAttribute("data-id").value;
    const quantity: number = object.target.value;
    const basketItem: Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.SquarejellyBox)
    this.cdr.detectChanges();
  }
   removeBasketItem(basketItemId: string) {
    $("#basketModal").modal("hide");

    this.dialogService.openDialog({
      componentType: BasketItemRemoveDialog,
      data: BasketItemDeleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.SquarejellyBox);
        await this.basketService.remove(basketItemId);

        var a = $("." + basketItemId)
        $("." + basketItemId).fadeOut(500, () => this.hideSpinner(SpinnerType.SquarejellyBox));
        $("#basketModal").modal("show");
      }
    });
  }

  shoppingComplete() {
   $("#basketModal").modal("hide");

    this.dialogService.openDialog({
      componentType: ShoppingCompleteDialog,
      data: ShoppingCompleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.SquarejellyBox);
        const order: Create_Order = new Create_Order();
        order.address = "Yenimahalle";
        order.description = "Falanca filanca...";
        await this.orderService.create(order);
        this.hideSpinner(SpinnerType.SquarejellyBox);
        this.toastrService.message("Sipariş alınmıştır!", "Sipariş Oluşturuldu!", {
          messageType: ToastrMessageType.Info,
          position: ToastrPosition.TopRight
        })
        this.router.navigate(["/"]);
      }
    });
  }
}
