import { Injectable }     from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Subject }        from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { SocketService, Socket } from '../shared';
import { ChatEvents }     from '../common/events/chat.events';
import { RoomListEvents}  from '../common/events/room-list.events';
import { IRoomInfo }      from '../common/json/json.IRoomInfo';
import { IChatMessage }   from '../common/json/json.IChatMessage';

const ROOMLIST_KEY = "chat";
const NAMESPACE = "chat";

@Injectable()
export class ChatService {
  //public rooms:NamespaceRoomList;
  public allMessages$:Observable<IChatMessage[]>;
  public currentRoom:IRoomInfo;

  private chatEvents:ChatEvents = new ChatEvents();
  private roomEvents:RoomListEvents = new RoomListEvents();
  private messages:IChatMessage[] = [];
  private socket:Socket;


  private receivedMessage$:Observable<IChatMessage>;
  private sentOrReceivedMessage$:Subject<IChatMessage>;

  /*public get roomListUpdate$():Observable<IRoomInfo[]> {
  //  return this.rooms.roomListUpdate$;
}*/

  constructor(private socketService:SocketService) {
    this.init();
  }

  public sendMessage(text:string):void {
    // todo: handle if this.currentroom is null
    let message:IChatMessage = {
      text: text,
      sender: "You", // todo: :|
      room: this.currentRoom.id
    }
    // todo: fix sender/username
    this.socket.emit(this.chatEvents.sendMessage, message);
    // todo: update to use username
    this.sentOrReceivedMessage$.next(message);
  }

  public getRooms() {
    this.socket.emit(this.roomEvents.getRooms);
  }

  public joinRoom(roomName:string):void {
    let room:IRoomInfo = { id: roomName };
    this.socket.emit(this.roomEvents.joinRoom, room.id); // todo: use roomInfo on server
  }

  private init() {
    console.log("initialized chat service");

    this.socket = this.socketService.of(NAMESPACE);
    this.initRoomListEvents();
    this.initChatEvents();
    this.joinRoom('global');
  }

  private initRoomListEvents():void {
    this.socket.fromEvent(this.roomEvents.roomChange).subscribe((room:IRoomInfo) => this.currentRoom = room);
  }

  private initChatEvents():void {
    this.receivedMessage$ = this.socket.fromEvent(this.chatEvents.receiveMessage);
    this.sentOrReceivedMessage$ = new Subject();
    this.receivedMessage$.subscribe(this.sentOrReceivedMessage$);
    this.allMessages$ = this.sentOrReceivedMessage$.map((message:IChatMessage) => {
      console.log("received message: " + message.text);
      this.messages.push(message);
      return this.messages;
    });
  }
}
