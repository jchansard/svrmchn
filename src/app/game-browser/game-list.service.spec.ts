import { TestBed, inject } from '@angular/core/testing';

import { GameListService } from './game-list.service';

describe('GameListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameListService]
    });
  });

  it('should be created', inject([GameListService], (service: GameListService) => {
    expect(service).toBeTruthy();
  }));
});
