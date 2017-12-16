import { BrowserModule }              from '@angular/platform-browser';
import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';

/* components */
import { AppComponent }               from './app.component';
import { GameBrowserComponent } from './game-browser/game-browser.component';
import { ChatComponent }              from './chat/chat.component';
import { MndlGaemComponent }          from './game/mndl-gaem/mndl-gaem.component';

import { RoomListComponent }          from './chat/room-list.component';

/* services */
import { SocketService, NamespaceRoomListService, SessionInfoService } from './shared';
import { ChatService }                from './chat/chat.service';
import { GameListService }            from './game-browser/game-list.service'

const appRoutes: Routes = [
  { path: '', redirectTo: '/browser', pathMatch: 'full' },
  { path: 'game', component: MndlGaemComponent },
  { path: 'browser', component: GameBrowserComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    MndlGaemComponent,
    RoomListComponent,
    GameBrowserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [SocketService, NamespaceRoomListService, SessionInfoService, ChatService, GameListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
