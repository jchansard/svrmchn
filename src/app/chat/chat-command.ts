export enum commandType {
  chat,
  whisper,
  join,
  leave,
  invalid
}

export interface ChatCommand {
  command: commandType,
  object?: string,
  text?: string
}
