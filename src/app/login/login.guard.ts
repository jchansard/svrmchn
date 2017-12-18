import { Injectable } from '@angular/core';
import { Router }     from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoginService } from './login.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private loginService:LoginService, private router:Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin(state.url);
  }

  checkLogin(url:string):boolean {
    if (this.loginService.isLoggedIn) { return true; }
    else {
      this.loginService.redirectUrl = url;
      this.router.navigate(['/login']);
      return false;
    }
  }
}
