import { TestBed, inject } from '@angular/core/testing';

import { NamespaceRoomListService } from './namespace-room-list.service';

describe('RoomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NamespaceRoomListService]
    });
  });

  it('should be created', inject([NamespaceRoomListService], (service: NamespaceRoomListService) => {
    expect(service).toBeTruthy();
  }));
});
