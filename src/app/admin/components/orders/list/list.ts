import { Component, OnInit, ViewChild } from '@angular/core';
import { Base, SpinnerType } from '../../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderService } from '../../../../services/common/models/orderservice';
import { Alertify, MessageType, Position } from '../../../../services/admin/alertify';
import { DialogService } from '../../../../services/common/dialog.service';
import { MatTableDataSource } from '@angular/material/table';
import { List_Order } from '../../../../contracts/order/list_order';
import { MatPaginator } from '@angular/material/paginator';
import { OrderDetailDialog } from '../../../../dialogs/order-detail-dialog/order-detail-dialog';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List extends Base implements OnInit {

  constructor(spinner: NgxSpinnerService,
    private orderService: OrderService,
    private alertifyService: Alertify,
    private dialogService: DialogService) {
    super(spinner)
  }
  displayedColumns: string[] = ['orderCode', 'userName', 'totalPrice', 'createdDate', 'completed', 'viewdetail', 'delete'];
  dataSource: MatTableDataSource<List_Order> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  async getOrders() {
    this.showSpinner(SpinnerType.SquarejellyBox);

    const allOrders: { totalOrderCount: number; orders: List_Order[] } = await this.orderService.getAllOrders(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallAtom), (errorMessage: any) => {
      this.alertifyService.message(errorMessage.message, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    })
    this.dataSource = new MatTableDataSource<List_Order>(allOrders.orders);
    this.paginator.length = allOrders.totalOrderCount;
  }

  async pageChanged() {
    await this.getOrders();
  }

  async ngOnInit() {
    await this.getOrders();
  }

  showDetail(id: string) {
    this.dialogService.openDialog({
      componentType: OrderDetailDialog,
      data: id,
      options: {
        width: "750px"
      }
    });
  }
}
