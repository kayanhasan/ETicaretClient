import { Component } from '@angular/core';
import { Base, SpinnerType } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../../../services/common/models/user-auth-service';
import { Alertify, MessageType, Position } from '../../../services/admin/alertify';

@Component({
  selector: 'app-password-reset',
  standalone: false,
  templateUrl: './password-reset.html',
  styleUrl: './password-reset.scss',
})
export class PasswordReset extends Base {

  constructor(spinner: NgxSpinnerService, private userAuthService: UserAuthService, private alertifyService: Alertify) {
    super(spinner)
  }

  passwordReset(email: string) {
    this.showSpinner(SpinnerType.SquarejellyBox)
    this.userAuthService.passwordReset(email, () => {
      this.hideSpinner(SpinnerType.SquarejellyBox)
      this.alertifyService.message("Mail başarıyla gönderilmiştir.", {
        messageType: MessageType.Notify,
        position: Position.TopRight
      });
    })
  }
  }
