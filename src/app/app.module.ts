import { BrowserModule }              from '@angular/platform-browser';
import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';

/* components */
import { AppComponent }               from './app.component';
import { ChatComponent }              from './chat/chat.component';
import { MndlGaemComponent }          from './game/mndl-gaem/mndl-gaem.component';

/* services */
import { SocketService, RoomService } from './shared';
import { GameSessionService }         from './game/game-session.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  { path: 'game', component: MndlGaemComponent },
  { path: 'rooms', component: ChatComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    MndlGaemComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [SocketService, RoomService, GameSessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
