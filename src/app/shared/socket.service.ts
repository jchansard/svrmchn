import { Injectable } from '@angular/core';
import * as SocketIO from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

@Injectable()
export class SocketService {
  private url = 'http://localhost:3000';
  private socket: SocketIO.Socket;

  constructor() {
    this.init();
  }

  private init():void {
    this.socket = SocketIO();
  }

  public emit(eventName:string) {
    this.socket.emit(eventName);
  }

  public unsubscribe(events:string|string[]) {
    if (typeof events === 'string') {
      this.socket.removeListeners(events);
    }
    else {
      events.forEach((event:string) => this.socket.removeListeners(event));
    }
  }

  public fromEvent<T>(eventName:string):Observable<T> {
    return Observable.create((observer:Subscriber<T>) => this.socket.on(eventName, (data:T) => observer.next(data)));
  }

  public fromEventOnce<T>(eventName:string):Observable<T> {
    return Observable.create((observer:Subscriber<T>) => {
      this.socket.once(eventName, (data:T) => observer.next(data));
      observer.complete();
    })
  }

}
