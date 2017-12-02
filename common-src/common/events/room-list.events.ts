import { Events } from './events';

export class RoomListEvents extends Events {
  public NAMESPACE:string = '/room-list';
  public createRoom:string = '>:create-room';
  public getRooms:string = '>:get-rooms';
  public roomListUpdate:string = '<:roomListUpdate';
}
