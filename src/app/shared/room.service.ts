import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { SocketService } from './socket.service';
import * as SocketIO from 'socket.io-client';
import 'rxjs/add/operator/first';

type TRoomListUpdateCallback = (roomID: string[]) => void;

@Injectable()
export class RoomService {
  private socket:SocketIO.Socket;
  public roomListUpdate$:Observable<string[]>;

  constructor(private socketService: SocketService) {
    this.socket = socketService;
    this.init();
  }

  private init():void {
    console.log("initialized");
    this.initListeners();
  }

  private ngOnDestroy() {
    this.socket.unsubscribe("roomListUpdate");
  }

  private initListeners():void {
    this.roomListUpdate$ = this.socket.fromEvent("roomListUpdate");
  }

  public getRooms():void {
    this.socket.emit("getRooms")
  }

  public createRoom():void {
    this.socket.emit("createRoom");
  }

  public onRoomListUpdate(callback:TRoomListUpdateCallback|null):void {
    this.roomListUpdate$.subscribe(callback);
  }

}
