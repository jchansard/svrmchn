import { Injectable } from '@angular/core';
import * as SocketIO from 'socket.io-client';

import { Socket } from './socket';

@Injectable()
export class SocketService {
  private url = 'http://localhost:3000';
  private rootSocket: SocketIO.Socket;

  constructor() {
    this.init();
  }

  private init():void {
    this.rootSocket = SocketIO();
  }

  public of(nameSpace:string):SocketIO.Socket {
    return new Socket(nameSpace);
  }

}
