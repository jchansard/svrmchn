import { Events } from './events';

export class ChatEvents extends Events {
  public NAMESPACE:string = '/chat';
  public sendMessage:string = '>:send-chat';
  public receiveMessage:string = '<:receive-chat';
}
