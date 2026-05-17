import { Component } from '@angular/core';
import { Base, SpinnerType } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products extends Base {
  constructor(spinner:NgxSpinnerService) {
    super(spinner);
    this.showSpinner(SpinnerType.SquarejellyBox);  
  }}