import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { Socket, SocketService, SessionInfoService } from '../shared';
import { LoginEvents } from '../common/events/login.events';

const NAMESPACE = "login";

@Injectable()
export class LoginService {
  public isLoggedIn:boolean = false;
  public redirectUrl: string;
  private socket:Socket;
  private events:LoginEvents = new LoginEvents();

  constructor(private http:HttpClient, private socketService:SocketService, private session:SessionInfoService) {
    this.init();
  }

  init():void {
    this.socket = this.socketService.of(NAMESPACE);
  }

  login(userName:string):Observable<any> { // TODO: use interface
    return this.http.post<any>('/api/authenticate', { userName: userName }).do((response:any) => {
      if (response.token) {
        this.isLoggedIn = true;
        this.session.userName = response.user;
        this.socket.emit(this.events.login, response.user);
      }
    });
  }

  logout():void {
    this.isLoggedIn = false;
  }
}
