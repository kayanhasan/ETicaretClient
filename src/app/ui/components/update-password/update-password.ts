import { Component, OnInit } from '@angular/core';
import { Base, SpinnerType } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../../../services/common/models/user-auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Alertify, MessageType, Position } from '../../../services/admin/alertify';
import { UserService } from '../../../services/common/models/userservice';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-update-password',
  standalone: false,
  templateUrl: './update-password.html',
  styleUrl: './update-password.scss',
})
export class UpdatePassword extends Base implements OnInit {
  constructor(
    spinner: NgxSpinnerService, 
    private cdr: ChangeDetectorRef, 
    private userAuthService: UserAuthService, 
    private activatedRoute: ActivatedRoute, 
    private alertifyService: Alertify, 
    private userService: UserService, 
    private router: Router
  ) {
    super(spinner);
  }

  state: any = {};
  // Parametreleri burada tutalım
  userId: string;
  resetToken: string;

  ngOnInit(): void {
    setTimeout(() => this.showSpinner(SpinnerType.SquarejellyBox));

    this.activatedRoute.params.subscribe({
      next: async params => {
        this.userId = params["userId"];
        this.resetToken = params["resetToken"];
        
        const result = await this.userAuthService.verifyResetToken(this.resetToken, this.userId, () => {
          this.hideSpinner(SpinnerType.SquarejellyBox);
        });

        this.state = result;
        // setTimeout yerine manuel tetikleme daha hızlı sonuç verir
        this.cdr.detectChanges(); 
      }
    });
  }

  async updatePassword(password: string, passwordConfirm: string) {
    if (password != passwordConfirm) {
      this.alertifyService.message("Şifreleri doğrulayınız!", {
        dismissOthers:true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }

    this.showSpinner(SpinnerType.SquarejellyBox);

    // Artık parametreler elimizde olduğu için tekrar subscribe olmaya gerek yok
    await this.userService.updatePassword(this.userId, this.resetToken, password, passwordConfirm,
      () => {
        this.alertifyService.message("Şifre başarıyla güncellenmiştir.", {
          dismissOthers:true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });
        this.hideSpinner(SpinnerType.SquarejellyBox);
        this.router.navigate(["/login"]);
      },
      error => {
        console.log(error);
        this.hideSpinner(SpinnerType.SquarejellyBox);
      });
  }
}
