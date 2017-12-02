import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { SocketService } from './socket.service';
import { Socket } from './socket';
import * as SocketIO from 'socket.io-client';
import 'rxjs/add/operator/first';

import { RoomListEvents } from '../common/events/room-list.events';
import { IRoomInfo } from '../common/json/json.IRoomInfo';

type TRoomListUpdateCallback = (roomIDs: IRoomInfo[]) => void;

@Injectable()
export class RoomService {
  private socket:Socket;
  private events:RoomListEvents = new RoomListEvents();
  public roomListUpdate$:Observable<IRoomInfo[]>;

  constructor(private socketService: SocketService) {
    this.socket = socketService.of(this.events.NAMESPACE);
    this.init();
  }

  private init():void {
    console.log("initialized room service");
    this.roomListUpdate$ = this.socket.fromEvent(this.events.roomListUpdate);
  }

  private ngOnDestroy() {
    this.socket.unsubscribe(this.events.allEvents);
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
