import { TestBed, inject } from '@angular/core/testing';

import { GameSessionService } from './game-session.service';

describe('GameSessionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameSessionService]
    });
  });

  it('should be created', inject([GameSessionService], (service: GameSessionService) => {
    expect(service).toBeTruthy();
  }));
});
