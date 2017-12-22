import { BrowserModule }              from '@angular/platform-browser';
import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';
import { HttpClientModule }           from '@angular/common/http';

/* components */
import { AppComponent }               from './app.component';
import { GameBrowserComponent }       from './game-browser/game-browser.component';
import { ChatComponent }              from './chat/chat.component';
import { MndlGaemComponent }          from './game/mndl-gaem/mndl-gaem.component';
import { LoginComponent }             from './login/login.component'

/* guards */
import { LoginGuard } from './login/login.guard';

/* services */
import { SocketService, SessionInfoService } from './shared';
import { ChatService }                from './chat/chat.service';
import { GameListService }            from './game-browser/game-list.service';
import { LoginService }               from './login/login.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/browser', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'game', canActivate: [LoginGuard], component: MndlGaemComponent },
  { path: 'browser', canActivate: [LoginGuard], component: GameBrowserComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    MndlGaemComponent,
    GameBrowserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [SocketService, SessionInfoService, ChatService, GameListService, LoginService, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
