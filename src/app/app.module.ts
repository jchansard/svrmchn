import { BrowserModule }              from '@angular/platform-browser';
import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';

/* components */
import { AppComponent }               from './app.component';
import { ChatComponent }              from './chat/chat.component';
import { MndlGaemComponent }          from './game/mndl-gaem/mndl-gaem.component';

/* services */
import { SocketService, NamespaceRoomListService, SessionInfoService } from './shared';
import { ChatService }                from './chat/chat.service';
import { RoomListComponent }          from './chat/room-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  { path: 'game', component: MndlGaemComponent },
  { path: 'rooms', component: RoomListComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    MndlGaemComponent,
    RoomListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [SocketService, NamespaceRoomListService, SessionInfoService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
