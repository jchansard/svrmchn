import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mndl-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages = ["test","another test"];

  constructor() { }

  ngOnInit() {
  }

}
