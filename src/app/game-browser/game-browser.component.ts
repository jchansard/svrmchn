import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GameListService } from './game-list.service';
import { IRoomInfo } from '../common/json/json.IRoomInfo';

@Component({
  selector: 'app-game-browser',
  templateUrl: './game-browser.component.html',
  styleUrls: ['./game-browser.component.css']
})
export class GameBrowserComponent implements OnInit {
  private gameList$:Observable<IRoomInfo[]>

  constructor(private gameListService:GameListService) { }

  ngOnInit() {
    this.gameList$ = this.gameListService.gameList$;
  }

}
