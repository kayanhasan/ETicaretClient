import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AdminModule } from './admin/admin-module';
import { UiModule } from './ui/ui-module';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Login } from './ui/components/login/login';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
  GoogleSigninButtonModule,
  SOCIAL_AUTH_CONFIG,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor-service';
import { DynamicLoadComponentDirective } from './directives/common/dynamicloadcomponentdirective';


@NgModule({
  declarations: [
    App,
    Login,
    DynamicLoadComponentDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    NgxSpinnerModule,
    HttpClientModule,
    ToastrModule.forRoot(),

    // Sosyal Login modüllerini buraya ekledik
    SocialLoginModule,
    GoogleSigninButtonModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('accessToken'),
        allowedDomains: ['localhost:7212'],
        disallowedRoutes: ['https://localhost:7212/api/auth/login'],
      },
    }),
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    { provide: 'baseUrl', useValue: 'https://localhost:7212/api', multi: true },
    { provide: 'baseSignalRUrl', useValue: 'https://localhost:7212/', multi: true },

    // Sosyal Login Yapılandırması
    {
      provide: SOCIAL_AUTH_CONFIG,
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '563396901575-is9r1jhri0sje9incnmh516v5do6qs2j.apps.googleusercontent.com',
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('800710876191698', {
              scope: 'email,public_profile', // Panelde aktif ettiğimiz izinleri buraya yazdık
              locale: 'tr_TR',
            }),
          },
        ],
        onError: (err) => console.log(err),
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [App],
})
export class AppModule {}
