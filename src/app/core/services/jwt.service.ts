import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor() { }
  getToken(): String {
    let tokenStr = window.localStorage["currentUser"];
    if (tokenStr) {
      let token = JSON.parse(tokenStr);
      token = JSON.parse(token);
      if (new Date(token["expiration"]).getTime() > new Date().getTime()) {
        return token.token;
      }
    }
    return null;
  }

  saveToken(token: string) {
    localStorage.setItem("currentUser", JSON.stringify(token));
  }

  destroyToken() {
    window.localStorage.removeItem("currentUser");
  }
}
