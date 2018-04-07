import { ChatCommand, commandType } from './chat-command';

export class MessageParser {

  private commandsRequiringObject = [
    commandType.whisper,
    commandType.join,
    commandType.leave
  ];
  private validCommands = {
    "/w": commandType.whisper,
    "/whisper": commandType.whisper,
    "/j": commandType.join,
    "/join": commandType.join
  }

  public parseMessage(message:string):ChatCommand {
    let allWords:string[],command:ChatCommand,type:commandType,object:string;
    let invalidCommand = { command: commandType.invalid };
    allWords = message.split(" ");
    type = this.extractCommand(allWords.shift());
    if (type === commandType.invalid) {
      return invalidCommand;
    }
    else if (this.commandRequiresObject(type)) {
      // if command is required, but there's only one word, it's invalid
      if (allWords.length < 2) {
        return invalidCommand;
      }
      else {
        return {
          command: type,
          object: allWords.shift(),
          text: allWords.join()
        };
      }
    }
    else {
      return {
        command: type,
        text: allWords.join()
      }
    }
  }

  private extractCommand(commandWord:string):commandType {
    console.log(commandWord);
    console.log(this.validCommands[commandWord] || commandType.invalid);
    if (commandWord[0] !== "/") return commandType.chat;
    else {
      console.log("here i am");
      return this.validCommands[commandWord] || commandType.invalid;
    }
    // if (text[0] !== "/") return null;
    // let command:commandType, commandWord:string;
    // commandWord = text.substring(1);
    //
    // let foundCommand = commandTypes.find((type) => {
    //   let firstLetter = type[0];
    //   let rest = type.slice(1);
    //   let regex = new RegExp(`${firstLetter}(${rest})`);
    //   return (!!commandWord.match(regex));
    // })
    // if (foundCommand) return commandType[foundCommand];
    // else return null;
  }

  private commandRequiresObject(command:commandType) {
    return this.commandsRequiringObject.includes(command);
  }
}
