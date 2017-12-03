import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../shared/';

@Component({
  selector: 'app-mndl-gaem',
  templateUrl: './mndl-gaem.component.html',
  styleUrls: ['./mndl-gaem.component.css']
})
export class MndlGaemComponent implements OnInit {

  constructor(private roomService: RoomService) { }

  ngOnInit() {
  }

}
