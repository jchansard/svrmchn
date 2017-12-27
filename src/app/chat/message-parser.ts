import { ChatCommand, commandType } from './chat-command';


let commandsRequiringObject = [
  commandType.whisper,
  commandType.join,
  commandType.leave
]

let invalidCommand = {
  command: commandType.invalid
}

export class MessageParser {
  public parseMessage(message:string):ChatCommand {
    let allWords,command,object;
    allWords = message.split(" ");
    command.command = this.extractCommand(allWords.shift());
    // if there's no command, it's a chat message
    if (!command.command) {
      return {
        command: commandType.chat,
        text: message
      };
    }
    else if (command.command = commandType.invalid) {
      return invalidCommand;
    }
    else if (this.commandRequiresObject(command.command)) {
      // if command is required, but there's only one word, it's invalid
      if (allWords.length < 2) {
        return invalidCommand;
      } else {
        return {
          command: command,
          object: allWords.shift(),
          text: allWords
        };
      }
    }
  }

  private extractCommand(text:string):commandType {
    if (text[0] !== "/") return null;
    let command:commandType, commandWord:string;
    commandWord = text.substring(1);

    let commandTypes = Object.keys(commandType);
    let foundCommand = commandTypes.find((type) => {
      let firstLetter = type[0];
      let rest = type.slice(1);
      let regex = new RegExp(`${firstLetter}(${rest})`);
      return (!!commandWord.match(regex));
    })
    if (foundCommand) return commandType[foundCommand];
    else return null;
  }

  private commandRequiresObject(command:commandType) {
    return commandsRequiringObject.includes(command);
  }
}
