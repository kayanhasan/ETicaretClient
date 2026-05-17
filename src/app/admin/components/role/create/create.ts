import { Component, EventEmitter,OnInit, Output } from '@angular/core';
import { Base, SpinnerType } from '../../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoleService } from '../../../../services/common/models/role.service';
import { Alertify, MessageType, Position } from '../../../../services/admin/alertify';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class Create extends Base implements OnInit {

  constructor(spiner: NgxSpinnerService,
    private roleService: RoleService,
    private alertify: Alertify) {
    super(spiner)
  }

  ngOnInit(): void {
  }

  @Output() createdRole: EventEmitter<string> = new EventEmitter();

  create(name: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);


    this.roleService.create(name.value, () => {
      this.hideSpinner(SpinnerType.SquarejellyBox);
      this.alertify.message("Role başarıyla eklenmiştir.", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.createdRole.emit(name.value);
    }, errorMessage => {
      this.alertify.message(errorMessage,
        {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
    });
  }
}
