import { action, makeObservable, observable } from "mobx";

const LOG = false;

export default class InteractionHistoryStore {
  undoArray = [];
  redoArray = [];

  constructor() {
    this.lastCmdTime = Date.now();
    this.idCounter = 0;

    makeObservable(this, {
      undoArray: observable,
      redoArray: observable,
      // historyDisabled: computed,
      execute: action,
      undo: action,
      redo: action,
    });
  }

  // get historyDisabled() {
  //   return this.metaStore.playMode;
  // }

  execute(cmd, optionalName) {
    // if (this.historyDisabled) {
    //   cmd.execute();
    //   return;
    // }
    const lastCmd = this.undoArray[this.undoArray.length - 1];
    const timeDifference = Date.now() - this.lastCmdTime;
    const isUpdatableCmd =
      lastCmd &&
      lastCmd.updatable &&
      cmd.updatable &&
      lastCmd.uuid === cmd.uuid &&
      lastCmd.type === cmd.type &&
      lastCmd.attributeName === cmd.attributeName;

    if (isUpdatableCmd && timeDifference < 500) {
      lastCmd.update(cmd);
      cmd = lastCmd;
    } else {
      this.undoArray.push(cmd);
      cmd.id = ++this.idCounter;
    }
    cmd.name = optionalName !== undefined ? optionalName : cmd.name;
    cmd.execute();

    this.lastCmdTime = Date.now();
    this.redoArray = [];
    this.log();
  }

  undo() {
    // if (this.historyDisabled) {
    //   return;
    // }
    let cmd = undefined;
    if (this.undoArray.length > 0) {
      cmd = this.undoArray.pop();
    }
    if (cmd !== undefined) {
      cmd.undo();
      this.redoArray.unshift(cmd);
    }
    this.log();
    return cmd;
  }

  redo() {
    // if (this.historyDisabled) {
    //   return;
    // }
    let cmd = undefined;
    if (this.redoArray.length > 0) {
      cmd = this.redoArray.shift();
    }
    if (cmd !== undefined) {
      cmd.execute();
      this.undoArray.push(cmd);
    }
    this.log();
    return cmd;
  }

  goToState(id) {
    if (id < 0) {
      return this.goToInitialState();
    }

    let cmd =
      this.undoArray.length > 0
        ? this.undoArray[this.undoArray.length - 1]
        : undefined; // next cmd to pop

    if (cmd === undefined || id > cmd.id) {
      cmd = this.redo();
      while (cmd !== undefined && id > cmd.id) {
        cmd = this.redo();
      }
    } else {
      while (cmd !== undefined && id !== cmd.id) {
        cmd = this.undoArray[this.undoArray.length - 1]; // next cmd to pop
        if (cmd !== undefined && id === cmd.id) break;
        this.undo();
      }
    }
  }

  goToInitialState() {
    let cmd = this.undoArray[this.undoArray.length - 1]; // next cmd to pop
    while (cmd !== undefined) {
      this.undo();
      cmd = this.undoArray[this.undoArray.length - 1]; // next cmd to pop
    }
  }

  clear() {
    this.undoArray = [];
    this.redoArray = [];
    this.idCounter = 0;
  }

  log() {
    if (!LOG) {
      return;
    }
    console.clear();
    console.log("== redoArray ==");
    this.redoArray.forEach((v) => {
      console.log(v);
    });
    console.log("== undoArray == ");
    this.undoArray.forEach((v) => {
      console.log(v);
    });
  }
}
