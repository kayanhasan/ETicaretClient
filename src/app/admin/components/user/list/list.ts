import { Component, OnInit, ViewChild } from '@angular/core';
import { Base, SpinnerType } from '../../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../../../services/common/models/userservice';
import { Alertify, MessageType, Position } from '../../../../services/admin/alertify';
import { DialogService } from '../../../../services/common/dialog.service';
import { MatTableDataSource } from '@angular/material/table';
import { List_User } from '../../../../contracts/users/list_user';
import { MatPaginator } from '@angular/material/paginator';
import { AuthorizeUserDialog } from '../../../../dialogs/authorize-user-dialog/authorize-user-dialog';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List extends Base implements OnInit {


  constructor(spinner: NgxSpinnerService,
    private userService: UserService,
    private alertifyService: Alertify,
    private dialogService: DialogService) {
    super(spinner)
  }


  displayedColumns: string[] = ['userName', 'nameSurname', 'email', 'twoFactorEnabled', 'role', 'delete'];
  dataSource: MatTableDataSource<List_User> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getUsers() {
    this.showSpinner(SpinnerType.BallAtom);

    const allUsers: { totalUsersCount: number; users: List_User[] } = await this.userService.getAllUsers(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallAtom), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }))
    this.dataSource = new MatTableDataSource<List_User>(allUsers.users);
    this.paginator.length = allUsers.totalUsersCount;
  }

  async pageChanged() {
    await this.getUsers();
  }

  async ngOnInit() {
    await this.getUsers();
  }

  assignRole(id: string) {
    this.dialogService.openDialog({
      componentType: AuthorizeUserDialog,
      data: id,
      options: {
        width: "750px"
      },
      afterClosed: () => {
        this.alertifyService.message("Roller başarıyla atanmıştır!", {
          dismissOthers:true,
          messageType: MessageType.Success,
          position: Position.TopRight
        })
      }
    });
  }
}
