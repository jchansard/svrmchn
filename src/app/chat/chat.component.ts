import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../shared';
import { GameSessionService } from '../game/game-session.service';

@Component({
  selector: 'mndl-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  rooms = [];

  constructor(private roomService:RoomService, private router: Router, private gameSession: GameSessionService ) {

  }

  ngOnInit() {
    this.roomService.onRoomListUpdate((rooms) => this.updateRoomList(rooms));
    this.roomService.getRooms();
  }

  private createRoom():void {
    this.roomService.createRoom();
  }

  private joinRoom(roomNumber:number):void {
    this.gameSession.roomID = "" + roomNumber;
    this.router.navigate(['/game']);
  }

  private updateRoomList(rooms:string[]) {
    this.rooms = rooms;
  }

}
