import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RoomService } from '../shared';
import { GameSessionService } from '../game/game-session.service';
import { IRoomInfo } from '../common/json/json.IRoomInfo';

@Component({
  selector: 'mndl-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  roomListUpdate$: Observable<IRoomInfo[]>
  rooms = [];

  constructor(private roomService:RoomService, private router: Router, private gameSession: GameSessionService ) {

  }

  ngOnInit() {
    this.roomListUpdate$ = this.roomService.roomListUpdate$;
    this.roomService.getRooms();
  }

  private createRoom():void {
    this.roomService.createRoom();
  }

  private joinRoom(roomInfo:IRoomInfo):void {
    this.gameSession.roomID = roomInfo.id;
    this.router.navigate(['/game']);
  }

}
