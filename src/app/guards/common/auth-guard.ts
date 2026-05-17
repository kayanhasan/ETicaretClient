import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/cutom-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base';
import { inject } from '@angular/core';
import { Authservice } from '../../services/common/authservice';


export const authGuard: CanActivateFn = (route, state) => {
  const jwtHelper: JwtHelperService = inject(JwtHelperService);
  const router: Router = inject(Router);
  const toastrService: CustomToastrService = inject(CustomToastrService);
  const spinner: NgxSpinnerService = inject(NgxSpinnerService);
  const authService: Authservice = inject(Authservice);

  spinner.show(SpinnerType.BallAtom);
  const token: string = localStorage.getItem("accessToken");

  /*let expired: boolean;
  try {
    expired = jwtHelper.isTokenExpired(token);
  } catch {
    expired = true;
  }*/

  if (!authService.isAuthenticated) {
    router.navigate(["login"], { queryParams: { returnUrl: state.url } })
    toastrService.message("Oturum açmanız gerekiyor!", "Yetkisiz Erişim", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    })
  }

  spinner.hide(SpinnerType.BallAtom);
  return true;
};
