import { Component, OnInit } from '@angular/core';
import { RoomService } from '../shared';

@Component({
  selector: 'mndl-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  rooms = [];
  roomService: RoomService;

  constructor(roomService:RoomService) {
    this.roomService = roomService;
  }

  ngOnInit() {
  }

  private createRoom():void {
    this.roomService.createRoom((roomID) => this.rooms.push(roomID));
  }

}
