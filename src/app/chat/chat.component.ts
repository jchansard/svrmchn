import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

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
  // todo: move to room component...?
  roomListUpdate$: Observable<IRoomInfo[]>
  allMessages$: Observable<IChatMessage[]>

  rooms = [];
  messages = [];

  constructor(private chatService: ChatService, private gameSession: GameSessionService,  private router: Router) {
  }

  ngOnInit() {
    //this.roomService.roomChange$.subscribe(this.joinRoom.bind(this)); global breaks this...
    this.chatService.getRooms();
  }

  private sendChatMessage(message) {
    this.chatService.sendMessage(message);
  }

  private createRoom():void {
    this.chatService.createRoom();
  }

  private joinRoom(roomInfo:IRoomInfo):void {
    // todo: reuse room service...
    //this.gameSession.roomID = roomInfo.id;
    this.chatService.joinRoom(roomInfo.id);
    this.router.navigate(['/game']);
  }

}
