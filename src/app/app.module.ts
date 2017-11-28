import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* components */
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';

/* services */
import { SocketService, RoomService } from './shared';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [SocketService, RoomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
