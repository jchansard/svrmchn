import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ChatService } from './chat.service';
import { NamespaceRoomList, SessionInfoService } from '../shared';
import { IRoomInfo } from '../common/json/json.IRoomInfo';

@Component({
  selector: 'mndl-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  private roomList:NamespaceRoomList;

  constructor(private chatService:ChatService, private sessionInfo:SessionInfoService, private router:Router) { }

  ngOnInit() {
    this.roomList = this.chatService.rooms;
  }
  private createRoom():void {
    this.roomList.createRoom();
  }

  private joinRoom(roomInfo:IRoomInfo):void {
    // todo: reuse room service...
    //this.gameSession.roomID = roomInfo.id;
    this.chatService.rooms.joinRoom(roomInfo.id);
    this.sessionInfo.roomID = roomInfo.id;
    this.router.navigate(['/game']);
  }
}
