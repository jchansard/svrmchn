import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Socket } from './socket';

import { RoomListEvents } from '../common/events/room-list.events';
import { IRoomInfo } from '../common/json/json.IRoomInfo';

export class NamespaceRoomList {
  private events:RoomListEvents = new RoomListEvents();

  public currentRoom:string;
  public roomListUpdate$:Observable<IRoomInfo[]>;
  public roomChange$:Observable<IRoomInfo>;

  constructor(private socket:Socket) {
    this.init();
  }

  private init():void {
    this.roomListUpdate$ = this.socket.fromEvent(this.events.roomListUpdate);
    this.roomChange$ = this.socket.fromEvent(this.events.roomChange);

    this.roomChange$.subscribe((newRoom) => {
      this.currentRoom = newRoom.id;
    });
  }

  public unsubscribeAll() {
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
    if (!this.currentRoom === undefined) {
      this.socket.emit(this.events.leaveRoom, room);
    }
    this.socket.emit(this.events.joinRoom, room);
  }

}
