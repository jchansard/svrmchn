import * as SocketIO from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Events } from '../common/events/events';

export class Socket {
  private socket:SocketIO.Socket

  constructor(nameSpace:string) {
    this.socket = SocketIO(nameSpace);
  }

  public emit(eventName:string, data?:any) {
    this.socket.emit(eventName, data);
  }

  // todo: take an events object and unsubscribe from everything
  public unsubscribe(events:string|string[]) {
    if (typeof events === 'string') {
      this.socket.removeListeners(events);
    }
    else {
      events.forEach((event:string) => {
        this.socket.removeListeners(event);
      });
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
