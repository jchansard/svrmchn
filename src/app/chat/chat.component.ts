import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ChatService } from './chat.service';
import { IChatMessage } from '../common/json/json.IChatMessage';

@Component({
  selector: 'mndl-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  allMessages$: Observable<IChatMessage[]>

  rooms = [];
  messages = [];

  constructor(private chatService: ChatService,  private router: Router) {
  }

  ngOnInit() {
    this.chatService.getRooms(); //todo: this doesn't do anything with the new room list
  }

  private sendChatMessage(message:string) {
    this.chatService.sendMessage(message);
  }

  private isDifferentRoom(roomName:string) {
    return (roomName !== this.chatService.currentRoom.id); // todo: icky
  }
}
