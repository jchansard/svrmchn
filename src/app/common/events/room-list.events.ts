import { Events } from './events';

export class RoomListEvents extends Events {
  public NAMESPACE:string = '/chat';

  public createRoom:string = '>:create-room';
  public joinRoom:string = ">:join-room";
  public leaveRoom:string= ">:leave-room";
  public getRooms:string = '>:get-rooms';
  public roomListUpdate:string = '<:roomListUpdate';
  public roomChange:string = "<:roomChange";
}
