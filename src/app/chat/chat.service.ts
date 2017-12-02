import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { SocketService, Socket } from '../shared';
import { ChatEvents } from '../common/events/chat.events';
import { IChatMessage } from '../common/json/json.IChatMessage';

@Injectable()
export class ChatService {
  private events:ChatEvents = new ChatEvents();
  private messages:IChatMessage[] = [];
  private socket:Socket;

  private receivedMessage$:Observable<IChatMessage>;
  private sentOrReceivedMessage$:Subject<IChatMessage>;
  public allMessages$:Observable<IChatMessage[]>;


  constructor(private socketService:SocketService) {
    this.init();
  }

  private init() {
    console.log("initialized chat service");
    this.socket = this.socketService.of(this.events.NAMESPACE);
    
    this.receivedMessage$ = this.socket.fromEvent(this.events.receiveMessage);
    this.sentOrReceivedMessage$ = new Subject();
    this.receivedMessage$.subscribe(this.sentOrReceivedMessage$);
    this.allMessages$ = this.sentOrReceivedMessage$.map((message:IChatMessage) => {
      console.log("received message: " + message.text);
      this.messages.push(message);
      return this.messages;
    });
  }

  public sendMessage(message:string) {
    this.socket.emit(this.events.sendMessage, message);
    // todo: update to use username
    this.sentOrReceivedMessage$.next({ text: message, sender: "You" });
  }
}
