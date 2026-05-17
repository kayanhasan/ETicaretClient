import { Component, signal, ViewChild } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/cutom-toastr';
import { Authservice } from './services/common/authservice';
import { Router } from '@angular/router';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamicloadcomponentservice';
import { DynamicLoadComponentDirective } from './directives/common/dynamicloadcomponentdirective';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
 @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;
constructor(public authService:Authservice, private toastrService: CustomToastrService, private router: Router, private dynamicLoadComponentService: DynamicLoadComponentService){
  authService.identityCheck();
}
signOut(){
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  this.authService.identityCheck();
  this.router.navigate([""]);
   this.toastrService.message("Oturum kapatılmıştır!", "Oturum Kapatıldı", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    });
}
 loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent, this.dynamicLoadComponentDirective.viewContainerRef);
  }
}
