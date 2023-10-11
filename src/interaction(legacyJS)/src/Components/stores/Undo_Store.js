import { observable } from "mobx";

class UnDoData {
  target; // undo 될 목표
  data; // callback에 필요한 data
  undoCallback; //undo callback 함수
  redoCallback; // redo callback 함수
  constructor(target, data, undoCallback, redoCallback) {
    this.target = target;
    this.data = data;
    this.undoCallback = undoCallback;
    this.redoCallback = redoCallback;
  }
}

const undo_store = observable({
  unDoArray: [],
  reDoArray: [],
  history: [],

  AddUnDoCommand(target, data, undoCallback, redoCallback) {
    const undo = new UnDoData(target, data, undoCallback, redoCallback);
    if (this.unDoArray.length > 15) {
      this.unDoArray.shift();
    }
    this.unDoArray = [...this.unDoArray, undo];
    this.reDoArray = [];
  },
  AddUnDoCommandInRedo(target, data, undoCallback, redoCallback) {
    const undo = new UnDoData(target, data, undoCallback, redoCallback);
    if (this.unDoArray.length > 15) {
      this.unDoArray.shift();
    }
    this.unDoArray = [...this.unDoArray, undo];
  },
  AddReDoCommand(target, data, undoCallback, redoCallback) {
    var redo = new UnDoData(target, data, undoCallback, redoCallback);
    this.reDoArray = [...this.reDoArray, redo];
  },
  async UnDo() {
    if (this.unDoArray.length === 0) {
      return;
    }
    var undo = this.unDoArray.pop();
    undo.undoCallback(undo.target, undo.data);
    this.AddReDoCommand(
      undo.target,
      undo.data,
      undo.undoCallback,
      undo.redoCallback
    );
  },
  async ReDo() {
    if (this.reDoArray.length === 0) {
      return;
    }
    var redo = this.reDoArray.pop();
    redo.redoCallback(redo.target, redo.data);
    this.AddUnDoCommandInRedo(
      redo.target,
      redo.data,
      redo.undoCallback,
      redo.redoCallback
    );
  },

  async repeatUnDo(index) {
    const count = this.unDoArray.length - index - 1;
    for (let i = 0; i < count; i++) {
      await this.UnDo();
    }
  },
  async repeatReDo(index) {
    const count = this.reDoArray.length - index;
    for (let i = 0; i < count; i++) {
      await this.ReDo();
    }
  },
  SaveHistory() {
    this.history = [...this.unDoArray];
  },
  ChangeCheck() {
    if (this.history.length !== this.unDoArray.length) {
      return false;
    }

    // 모든 요소가 같은지 비교
    return this.history.every(
      (element, index) => element === this.unDoArray[index]
    );
  },
  ClearStore() {
    this.unDoArray = [];
    this.reDoArray = [];
    this.history = [];
  },
});

export { undo_store };
