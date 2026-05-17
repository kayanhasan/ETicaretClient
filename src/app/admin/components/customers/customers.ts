import { Component } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { Base, SpinnerType } from '../../../base/base';
@Component({
  selector: 'app-customers',
  standalone: false,
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class Customers extends Base {
  constructor(spinner:NgxSpinnerService) {
    super(spinner);
    this.showSpinner(SpinnerType.SquarejellyBox);  
  }
  
}
