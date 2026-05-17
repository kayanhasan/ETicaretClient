import { Component, OnInit } from '@angular/core';
import { Alertify,MessageType,Position } from '../../../services/admin/alertify';
import { Base, SpinnerType } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignalRService } from '../../../services/common/signalr-service';
import { HubUrls } from '../../../constants/hub-urls';
import { ReceiveFunctions } from '../../../constants/receive-functions';


@Component({
  selector: 'app-dashboards',
  standalone: false,
  templateUrl: './dashboards.html',
  styleUrl: './dashboards.scss',  
})
export class Dashboards extends Base implements OnInit{
  constructor(private alertify: Alertify, spinner: NgxSpinnerService, private signalRService: SignalRService) {
    super(spinner);
    signalRService.start(HubUrls.ProductHub)
    signalRService.start(HubUrls.OrderHub)
     
  }
  ngOnInit(): void {
     this.signalRService.on(HubUrls.ProductHub, ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      this.alertify.message(message, {
        dismissOthers:true,
        messageType: MessageType.Notify,
        position: Position.TopRight
      })
    });
    this.signalRService.on(HubUrls.OrderHub, ReceiveFunctions.OrderAddedMessageReceiveFunction, message => {
      this.alertify.message(message, {
        dismissOthers:true,
        messageType: MessageType.Notify,
        position: Position.TopCenter
      })
    });
  }
  
   
  
}
