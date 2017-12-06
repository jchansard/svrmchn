import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { SocketService, Socket, NamespaceRoomList, NamespaceRoomListService} from '../shared';
import { ChatEvents }   from '../common/events/chat.events';
import { IRoomInfo }    from '../common/json/json.IRoomInfo';
import { IChatMessage } from '../common/json/json.IChatMessage';

const ROOMLIST_KEY = "chat";

@Injectable()
export class ChatService {
  private events:ChatEvents = new ChatEvents();
  private messages:IChatMessage[] = [];
  private socket:Socket;
  public rooms:NamespaceRoomList;

  private receivedMessage$:Observable<IChatMessage>;
  private sentOrReceivedMessage$:Subject<IChatMessage>;
  public allMessages$:Observable<IChatMessage[]>;

  public get roomListUpdate$():Observable<IRoomInfo[]> {
    return this.rooms.roomListUpdate$;
  }

  constructor(private socketService:SocketService, private roomListService:NamespaceRoomListService) {
    this.init();
  }

  private init() {
    console.log("initialized chat service");

    this.socket = this.socketService.of(this.events.NAMESPACE);
    this.rooms = this.roomListService.newRoomList(ROOMLIST_KEY, this.socket);
    this.rooms.joinRoom('global');

    this.receivedMessage$ = this.socket.fromEvent(this.events.receiveMessage);
    this.sentOrReceivedMessage$ = new Subject();
    this.receivedMessage$.subscribe(this.sentOrReceivedMessage$);
    this.allMessages$ = this.sentOrReceivedMessage$.map((message:IChatMessage) => {
      console.log("received message: " + message.text);
      this.messages.push(message);
      return this.messages;
    });
  }

  public sendMessage(text:string) {
    let message:IChatMessage = {
      text: text,
      sender: "You", // todo: :|
      room: this.rooms.currentRoom
    }
    // todo: fix sender/username
    this.socket.emit(this.events.sendMessage, message);
    // todo: update to use username
    this.sentOrReceivedMessage$.next(message);
  }
}
