import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { SocketService } from './socket.service';
import * as SocketIO from 'socket.io-client';
import 'rxjs/add/operator/first';

import { RoomListEvents } from '../common/events/room-list-events';
import { IRoomInfo } from '../common/json/json.IRoomInfo';

type TRoomListUpdateCallback = (roomIDs: IRoomInfo[]) => void;

@Injectable()
export class RoomService {
  private socket:SocketIO.Socket;
  private events:RoomListEvents;
  public roomListUpdate$:Observable<IRoomInfo[]>;

  constructor(private socketService: SocketService) {
    this.socket = socketService;
    this.init();
  }

  private init():void {
    console.log("initialized");
    this.events = new RoomListEvents();
    this.initListeners();
  }

  private ngOnDestroy() {
    this.socket.unsubscribe();
  }

  private initListeners():void {
    this.roomListUpdate$ = this.socket.fromEvent(this.events.roomListUpdate);
  }

  public getRooms():void {
    this.socket.emit(this.events.getRooms)
  }

  public createRoom():void {
    this.socket.emit(this.events.createRoom);
  }

  // todo: currently unused
  public onRoomListUpdate(callback:TRoomListUpdateCallback|null):void {
    this.roomListUpdate$.subscribe(callback);
  }

}