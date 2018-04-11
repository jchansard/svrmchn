import { ChatCommand, commandType } from './chat-command';

type CommandWithRegex = {
  command:string,
  regex: RegExp
}

export class MessageParser {

  private validCommands:CommandWithRegex[] = [
    {
      command: "whisper",
      regex: /\/w(?:hisper)? (\w+) ([\s\w]*)/
    },
    {
      command: "join",
      regex: /\/j(?:oin)? (\w+)$/
    }
  ]

  public parseMessage(message:string):ChatCommand {
    if (this.messageHasCommand(message)) {
      return this.parseCommand(message);
    }
    else {
      return {
        command: commandType.chat,
        arguments: [message]
      }
    }
  }

  private messageHasCommand(message:string):boolean {
    return message.startsWith("/");
  }

  private parseCommand(message:string):ChatCommand {
    for (let index = 0; index < this.validCommands.length; index++) {
      let command = this.validCommands[index];
      let regex:RegExp = command.regex;
      let matches = message.match(regex);
      if (matches !== null) {
        return {
          command: commandType[command.command],
          arguments: matches.slice(1)
        }
      }
    }

    // no valid commands found
    return {
      command: commandType.invalid
    }
  }
}
