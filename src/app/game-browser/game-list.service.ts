import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SocketService, Socket } from '../shared';
import { RoomListEvents } from '../common/events/room-list.events';
import { IRoomInfo } from '../common/json/json.IRoomInfo';

const NAMESPACE = "game-browser" //todo: common

@Injectable()
export class GameListService {
  private socket:Socket;
  private events:RoomListEvents = new RoomListEvents();
  public gameList$:Observable<IRoomInfo[]>;

  constructor(private socketService:SocketService) {
    this.init();
  }

  private init():void {
    this.socket = this.socketService.of(NAMESPACE);
    this.gameList$ = this.socket.fromEvent(this.events.roomListUpdate);
  }

}
