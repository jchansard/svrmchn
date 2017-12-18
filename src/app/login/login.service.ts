import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { LoginEvents } from '../common/events/login.events';
import { SocketService, Socket } from '../shared';
const NAMESPACE = "login";

@Injectable()
export class LoginService {
  public isLoggedIn:boolean = false;
  public redirectUrl: string;

  private events:LoginEvents = new LoginEvents();
  private socket:Socket;
  private loggedIn$: Observable<boolean>;

  constructor(private socketService:SocketService) {
    this.init();
  }

  init():void {
    this.socket = this.socketService.of(NAMESPACE);
    this.loggedIn$ = this.socket.fromEvent(this.events.loggedIn);
    this.loggedIn$.subscribe((val) => this.isLoggedIn = val);
  }

  login(userName:string):Observable<boolean> {
    this.socket.emit(this.events.login, userName);
    return this.loggedIn$;
  }

  logout():void {
    this.isLoggedIn = false;
  }
}
