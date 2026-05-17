import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  constructor(private jwtHelper: JwtHelperService) { }
public isAuthenticated: boolean = false;
  identityCheck() {
    const token: string = localStorage.getItem("accessToken");

    //const decodeToken = this.jwtHelper.decodeToken(token);
    //const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(token);
    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }

    // Doğrudan sınıfın property'sini güncelliyoruz
    this.isAuthenticated = token != null && !expired;
  }

  
}

