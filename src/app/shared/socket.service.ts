import { Injectable } from '@angular/core';
import * as SocketIO from 'socket.io-client';

@Injectable()
export class SocketService {
  private url = 'http://localhost:3000';
  private socket: SocketIO.Socket;

  constructor() {
    this.init();
  }

  init():void {
    this.socket = SocketIO();
  }

  getSocket():SocketIO.Socket {
    return this.socket;
  }

}
