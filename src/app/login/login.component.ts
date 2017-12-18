import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router'

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private users:string[] = ["glasg0wn3d", "foxyMoron", "OXXBOW", "online_playing", "chimichanga420", "LEFT4SCRAPS"]
  private message:string;

  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit() {
  }

  login(user:string):void {
    this.message = "logging in..."
    this.loginService.login(user).subscribe((loggedIn) => {
      if (isLoggedIn) { // TODO: use do observable?
        this.message = `logged in as ${user}`;
        let redirectUrl = this.loginService.redirectUrl ? this.loginService.redirectUrl : '/browser';
        this.router.navigate([redirectUrl]);
      }
    })
  }

  logout():void {
    this.loginService.logout();
    this.message = "logged out";
  }
}
