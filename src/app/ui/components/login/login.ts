import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/common/models/userservice';
import { Base, SpinnerType } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { Authservice } from '../../../services/common/authservice';
import { ActivatedRoute, Router } from '@angular/router';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { UserAuthService } from '../../../services/common/models/user-auth-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login extends Base implements OnInit{

  constructor(private userAuthService:UserAuthService,spinner: NgxSpinnerService,public authService:Authservice,private activatedRoute: ActivatedRoute, private router: Router,private socialAuthService: SocialAuthService){
    super(spinner);
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      this.showSpinner(SpinnerType.SquarejellyBox);
      console.log(user)
       switch (user.provider) {
        case "GOOGLE":
          await userAuthService.googleLogin(user, () => {
            this.authService.identityCheck();
            this.hideSpinner(SpinnerType.SquarejellyBox);
            const returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"];
    
    if (returnUrl) {
      this.router.navigate([returnUrl]);
    } else {
      this.router.navigate([""]); // Eğer returnUrl yoksa ana sayfaya at, Navbar güncellensin!
    }

          })
          break;
        case "FACEBOOK":
          await userAuthService.facebookLogin(user, () => {
            this.authService.identityCheck();
            this.hideSpinner(SpinnerType.SquarejellyBox);
            const returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"];
    
    if (returnUrl) {
      this.router.navigate([returnUrl]);
    } else {
      this.router.navigate([""]); // Eğer returnUrl yoksa ana sayfaya at, Navbar güncellensin!
    }

          })
          break;
      }
     
      
    });
  }
  ngOnInit(): void {
  
  }
 async login(userNameOrEmail: string, password: string) {
  this.showSpinner(SpinnerType.SquarejellyBox);
  
  await this.userAuthService.login(userNameOrEmail, password, () => {
    this.authService.identityCheck();

    // QueryParams'ı tek seferlik almak için snapshot daha pratiktir
    const returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"];
    
    if (returnUrl) {
      this.router.navigate([returnUrl]);
    } else {
      this.router.navigate([""]); // Eğer returnUrl yoksa ana sayfaya at, Navbar güncellensin!
    }

    this.hideSpinner(SpinnerType.SquarejellyBox);
  });
}
facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
