import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { SocketService } from './socket.service';
import * as SocketIO from 'socket.io-client';
import 'rxjs/add/operator/first';

type TCreateRoomCallback = (roomID: string) => void;

@Injectable()
export class RoomService {
  private socket:SocketIO.Socket;
  private roomListUpdateStream:Observable<string>;

  constructor(private socketService: SocketService) {
    this.init();
  }

  private init():void {
    this.socket = this.socketService.getSocket();
    this.initListeners();
  }

  private initListeners():void {
    this.roomListUpdateStream = new Observable((stream:Subscriber<string>) => {
      this.socket.on("roomCreated",(roomID:string) => stream.next(roomID));
    })
  }

  public createRoom(callback: TCreateRoomCallback|null):void {
    this.socket.emit("createRoom");
    this.roomListUpdateStream.first().subscribe(callback);
  }

}
