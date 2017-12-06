import { Injectable } from '@angular/core';
import { Socket } from './socket';
import { NamespaceRoomList } from './namespace-room-list';


@Injectable()
export class NamespaceRoomListService {
  private namespaceRoomLists: Map<string,NamespaceRoomList>;

  constructor() {
    this.namespaceRoomLists = new Map<string,NamespaceRoomList>();
  }

  private ngOnDestroy() {
    Object.keys(this.namespaceRoomLists).forEach((key) => this.namespaceRoomLists[key].unsubscribeAll());
  }

  public getRoomList(key:string):NamespaceRoomList {
    if (this.namespaceRoomLists.has(key)) {
      return this.namespaceRoomLists[key];
    }
    else {
      return null;
    }
  }

  public newRoomList(key:string, socket:Socket):NamespaceRoomList {
    let socketRoomList = new NamespaceRoomList(socket);
    this.namespaceRoomLists[key] = socketRoomList;
    return socketRoomList;
  }

}
