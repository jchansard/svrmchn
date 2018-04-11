import { Injectable }     from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Subject }        from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { SocketService, Socket, SessionInfoService } from '../shared';
import { ChatEvents }     from '../common/events/chat.events';
import { RoomListEvents}  from '../common/events/room-list.events';
import { IRoomInfo }      from '../common/json/json.IRoomInfo';
import { IChatMessage }   from '../common/json/json.IChatMessage';
import { MessageParser }  from './message-parser';
import { commandType, ChatCommand } from './chat-command';

const ROOMLIST_KEY = "chat";
const NAMESPACE = "chat";

@Injectable()
export class ChatService {
  //public rooms:NamespaceRoomList;
  public allMessages$:Observable<IChatMessage[]>;
  public currentRoom:IRoomInfo;
  private whisperRoom:IRoomInfo;

  private chatEvents:ChatEvents = new ChatEvents();
  private roomEvents:RoomListEvents = new RoomListEvents();
  private messages:IChatMessage[] = [];
  private socket:Socket;
  private messageParser:MessageParser;


  private receivedMessage$:Observable<IChatMessage>;
  private sentOrReceivedMessage$:Subject<IChatMessage>;

  /*public get roomListUpdate$():Observable<IRoomInfo[]> {
  //  return this.rooms.roomListUpdate$;
}*/

  constructor(private socketService:SocketService, private session:SessionInfoService) {
    this.init();
  }

  public sendMessage(text:string):void {
    let command = this.messageParser.parseMessage(text);
    switch (command.command) {
      case commandType.chat:
        this.sendChatMessage(command.arguments[0]);
        break;
      case commandType.whisper:
        this.sendWhisper(command.arguments[0], command.arguments[1]);
        break;
      case commandType.join:
        this.joinRoom(command.arguments[0]);
        break;
      case commandType.invalid:
        this.sentOrReceivedMessage$.next({
          text: "Invalid command",
          room: { id: "System" }, //TODO: duh
          sender: "Error",
        });
        break;
    }
  }

  public getRooms() {
    this.socket.emit(this.roomEvents.getRooms);
  }

  public joinRoom(roomName:string):void {
    let room:IRoomInfo = this.createRoom(roomName);
    this.socket.emit(this.roomEvents.joinRoom, room);
  }

  private init() {
    console.log("initialized chat service");

    this.socket = this.socketService.of(NAMESPACE);
    this.messageParser = new MessageParser();
    this.initRoomListEvents();
    this.initChatEvents();
    this.initWhisper();
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

  private initWhisper():void {
    this.whisperRoom = this.getWhisperRoom(this.session.userName);
    this.socket.emit(this.roomEvents.joinRoom, this.whisperRoom);
  }

  private sendChatMessage(text:string):void {
    let message:IChatMessage = {
      text: text,
      sender: this.session.userName,
      room: this.currentRoom
    }
    this.emitMessage(message);
  }

  private sendWhisper(toUser:string, text:string):void {
    let message:IChatMessage = {
      text: text,
      sender: this.session.userName,
      room: this.getWhisperRoom(toUser)
    }
    this.emitMessage(message);
  }

  private emitMessage(message:IChatMessage):void {
    this.socket.emit(this.chatEvents.sendMessage, message);
    this.sentOrReceivedMessage$.next(message);
  }

  private createRoom(roomName:string):IRoomInfo {
    return {
      id: roomName
    };
  }

  private getWhisperRoom(userName:string):IRoomInfo {
    return {
      id: userName,
      isWhisper: true
    };
  }
}
