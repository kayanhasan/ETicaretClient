import { Component } from '@angular/core';
import  {  NgxSpinnerService  }  from  "ngx-spinner" ; 
import { Base, SpinnerType } from '../../../base/base';
@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders extends Base {
  constructor(spinner:NgxSpinnerService) {
    super(spinner);
    this.showSpinner(SpinnerType.SquarejellyBox);  
  }
}
