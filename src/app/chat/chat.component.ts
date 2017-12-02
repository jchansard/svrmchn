import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RoomService } from '../shared';
import { ChatService } from './chat.service';
import { GameSessionService } from '../game/game-session.service';
import { IRoomInfo } from '../common/json/json.IRoomInfo';
import { IChatMessage } from '../common/json/json.IChatMessage';

@Component({
  selector: 'mndl-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  // todo: move to room...?
  roomListUpdate$: Observable<IRoomInfo[]>
  allMessages$: Observable<IChatMessage[]>

  rooms = [];
  messages = [];

  constructor(private roomService:RoomService, private chatService: ChatService, private gameSession: GameSessionService,  private router: Router) {

  }

  ngOnInit() {
    this.roomListUpdate$ = this.roomService.roomListUpdate$;
    this.roomService.getRooms();
  }

  private sendChatMessage(message) {
    this.chatService.sendMessage(message);
  }

  private createRoom():void {
    this.roomService.createRoom();
  }

  private joinRoom(roomInfo:IRoomInfo):void {
    this.gameSession.roomID = roomInfo.id;
    this.router.navigate(['/game']);
  }

}
