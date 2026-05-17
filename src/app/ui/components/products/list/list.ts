import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Base, SpinnerType } from '../../../../base/base';
import { Product } from '../../../../services/common/models/product';
import { ActivatedRoute } from '@angular/router';
import { List_Product } from '../../../../contracts/list_product';
import { FileService } from '../../../../services/common/models/fileservice';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/ui/cutom-toastr';
import { BaseUrl } from '../../../../contracts/baseurl';
import { Create_Basket_Item } from '../../../../contracts/basket/create_basket_item';
import { BasketService } from '../../../../services/common/models/basketservice';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List extends Base implements OnInit {

  constructor(private productService: Product, private activatedRoute: ActivatedRoute, private fileService: FileService,private cdr: ChangeDetectorRef , private basketService: BasketService, spinner: NgxSpinnerService, private customToastrService: CustomToastrService) {
    super(spinner)
  }

  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 12;
  pageList: number[] = [];
  baseUrl: BaseUrl;
  products: List_Product[];
  async ngOnInit() {
    // Veriyi çekiyoruz
    const baseStorageUrl = await this.fileService.getBaseStorageUrl();

    this.activatedRoute.params.subscribe(async params => {
      this.showSpinner(SpinnerType.SquarejellyBox);
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);

      const data = await this.productService.read(
        this.currentPageNo - 1, 
        this.pageSize,
        () => { }, 
        errorMessage => { }
      );

      // Atamaları yapıyoruz
      this.baseUrl = baseStorageUrl; 
      this.products = data.products.map<List_Product>(p => ({
        ...p,
        imagePath: p.productImageFiles?.length 
          ? (p.productImageFiles.find(img => img.showcase)?.path ?? p.productImageFiles[0].path) 
          : ""
      }));

      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

      // Sayfalama kodlarınız...
      this.pageList = [];
      // ... (for döngüleri)

      this.hideSpinner(SpinnerType.SquarejellyBox);

      // 3. KRİTİK DOKUNUŞ: Angular'a değişikliği manuel bildiriyoruz
      this.cdr.detectChanges(); 
    });
  }

   async addToBasket(product: List_Product) {
    this.showSpinner(SpinnerType.SquarejellyBox);
    let _basketItem: Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = product.id;
    _basketItem.quantity = 1;
    await this.basketService.add(_basketItem);
    this.hideSpinner(SpinnerType.SquarejellyBox);
    this.customToastrService.message("Ürün sepete eklenmiştir.", "Sepete Eklendi", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    });
  }

}
