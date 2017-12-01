import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../shared';
import { GameSessionService } from '../game/game-session.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mndl-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  roomListUpdate$: Observable<string[]>
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

  private joinRoom(roomNumber:number):void {
    this.gameSession.roomID = "" + roomNumber;
    this.router.navigate(['/game']);
  }

}
