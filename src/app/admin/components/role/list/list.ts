import { Component,EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Base, SpinnerType } from '../../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoleService } from '../../../../services/common/models/role.service';
import { Alertify, MessageType, Position } from '../../../../services/admin/alertify';
import { DialogService } from '../../../../services/common/dialog.service';
import { MatTableDataSource } from '@angular/material/table';
import { List_Role } from '../../../../contracts/role/List_Role';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List extends Base implements OnInit {

  constructor(spinner: NgxSpinnerService,
    private roleService: RoleService,
    private alertifyService: Alertify,
    private dialogService: DialogService) {
    super(spinner)
  }


  displayedColumns: string[] = ['name', 'edit', 'delete'];
  dataSource: MatTableDataSource<List_Role> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getRoles() {
    this.showSpinner(SpinnerType.SquarejellyBox);
    const allRoles: { datas: List_Role[], totalCount: number } = await this.roleService.getRoles(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallAtom), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }))

    this.dataSource = new MatTableDataSource<List_Role>(allRoles.datas);
    this.paginator.length = allRoles.totalCount;
  }

  async pageChanged() {
    await this.getRoles();
  }

  async ngOnInit() {
    await this.getRoles();
  }

}
