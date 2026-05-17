import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private _connections: { [key: string]: HubConnection } = {};

  constructor(@Inject("baseSignalRUrl") private baseSignalRUrl: string) { }

 private _startingConnections: { [key: string]: Promise<HubConnection> } = {};

start(hubUrl: string): HubConnection {
  const fullUrl = this.baseSignalRUrl + hubUrl;

  // Eğer zaten aktif bir bağlantı varsa döndür
  if (this._connections[hubUrl] && this._connections[hubUrl].state !== HubConnectionState.Disconnected) {
    return this._connections[hubUrl];
  }

  // Eğer şu an bir bağlantı kurulma aşamasındaysa, yenisini başlatma, bekle
  const builder: HubConnectionBuilder = new HubConnectionBuilder();
  const hubConnection: HubConnection = builder.withUrl(fullUrl)
    .withAutomaticReconnect()
    .build();

  hubConnection.start()
    .then(() => {
      console.log(`${hubUrl} Connected`);
    })
    .catch(error => setTimeout(() => this.start(hubUrl), 2000));

  this._connections[hubUrl] = hubConnection;
  return hubConnection;
}

  invoke(hubUrl: string, procedureName: string, message: any, successCallBack?: (value: any) => void, errorCallBack?: (error: any) => void) {
    const connection = this.start(hubUrl);
    
    if (connection.state === HubConnectionState.Connected) {
      connection.invoke(procedureName, message).then(successCallBack).catch(errorCallBack);
    } else {
      // Bağlantı "Connecting" veya "Reconnecting" durumundaysa biraz bekleyip tekrar dene
      setTimeout(() => this.invoke(hubUrl, procedureName, message, successCallBack, errorCallBack), 1000);
    }
  }

  on(hubUrl: string, procedureName: string, callBack: (...message: any[]) => void) {
    const connection = this.start(hubUrl);
    connection.off(procedureName); // Mükerrer bildirimleri engellemek için kritik satır
    connection.on(procedureName, callBack);
  }
}