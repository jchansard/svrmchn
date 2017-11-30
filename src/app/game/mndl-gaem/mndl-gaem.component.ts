import { Component, OnInit } from '@angular/core';
import { GameSessionService } from '../game-session.service';

@Component({
  selector: 'app-mndl-gaem',
  templateUrl: './mndl-gaem.component.html',
  styleUrls: ['./mndl-gaem.component.css']
})
export class MndlGaemComponent implements OnInit {

  constructor(private gameSession: GameSessionService) { }

  ngOnInit() {
  }

}
