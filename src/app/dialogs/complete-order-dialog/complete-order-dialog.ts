import { Component, Inject } from '@angular/core';
import { Base } from '../../base/base';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-complete-order-dialog',
  standalone: false,
  templateUrl: './complete-order-dialog.html',
  styleUrl: './complete-order-dialog.scss',
})
export class CompleteOrderDialog  extends BaseDialog<CompleteOrderDialog>{
constructor(dialogRef: MatDialogRef<CompleteOrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CompleteOrderState) {
    super(dialogRef)
  }

  complete() {

  }
}
export enum CompleteOrderState {
  Yes,
  No
}
