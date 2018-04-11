import { IRoomInfo } from './json.IRoomInfo';

export interface IChatMessage {
  text: string,
  sender: string,
  room: IRoomInfo
}
