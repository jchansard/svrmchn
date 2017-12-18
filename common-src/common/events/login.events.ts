import { Events } from './events';

export class LoginEvents extends Events {
  public login:string = '>:login';
  public logout:string = ">:logout";
  public loggedIn:string= "<:logged-in";
}
