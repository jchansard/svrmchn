export class Events {
  public NAMESPACE:string = '/';
  public allEvents:string[] = Object.keys(this).filter((event) => event !== "NAMESPACE");
}
