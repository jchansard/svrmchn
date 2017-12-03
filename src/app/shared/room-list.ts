import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Socket } from './socket';

import { RoomListEvents } from '../common/events/room-list.events';
import { IRoomInfo } from '../common/json/json.IRoomInfo';

export class RoomList {
  private events:RoomListEvents = new RoomListEvents();

  public room:string;
  public roomListUpdate$:Observable<IRoomInfo[]>;
  public roomChange$:Observable<IRoomInfo>;

  constructor(private socket:Socket) {
    this.init();
  }

  private init():void {
    this.roomListUpdate$ = this.socket.fromEvent(this.events.roomListUpdate);
    this.roomChange$ = this.socket.fromEvent(this.events.roomChange);

    this.roomChange$.subscribe((newRoom) => {
      console.log("room change fired");
      this.room = newRoom.id;
    });
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

  public joinRoom(room:string):void {
    // todo: probably don't want to always leave
    if (!this.room === undefined) {
      this.socket.emit(this.events.leaveRoom, room);
    }
    this.socket.emit(this.events.joinRoom, room);
  }

}
