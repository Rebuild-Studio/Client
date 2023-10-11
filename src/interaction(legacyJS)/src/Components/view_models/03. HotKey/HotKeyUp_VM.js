import { HotKeyFunctionsAboutGeneralViewModel } from "./HotKeyFunctions_VM";
import { common_store } from "../../stores/Common_Store";

const generalVM = HotKeyFunctionsAboutGeneralViewModel;

class HotKey {
  constructor(key, execute) {
    this.key = key.toUpperCase();
    this.execute = execute;
  }

  isCommandFor(keyEvent) {
    return this.key === keyEvent.key.toUpperCase();
  }
}

const hotKeyCommands = [
  //기타(General Functions)
  new HotKey("CONTROL", generalVM.ctrlModeOff),
  new HotKey("META", generalVM.ctrlModeOff),
];

export function FindAndExecuteHotKeyUp(e) {
  if (e.repeat) return; //early return if 키보드연타
  if (common_store.curCategory !== "canvas") return //early return if not canvas
  if (
    document.activeElement.type !== "text" &&
    document.activeElement.role !== "presentation" &&
    document.activeElement.type !== "textarea"
  ) {
    const command = hotKeyCommands.find((hotKeyCommand) =>
      hotKeyCommand.isCommandFor(e)
    );
    if (command) {
      command.execute();
      e.preventDefault();
    }
  }
}
