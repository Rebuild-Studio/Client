import CanvasEventProcess from "./CanvasEventProcess";

export default class KeyboardCanvasEventProcess extends CanvasEventProcess {
  constructor(nodeRuntime) {
    super(nodeRuntime);
    if (this.data.NODE_DAT_KEYBOARD_ACTION === "hold") {
      this.Outputs([false], true);
      this.registerEventListener("keyup", (e) => this.handleEventFalse(e));
    } else {
      this.nodeRuntime.setOutputDefaultValueIndex(0, false);
    }
    this.registerEventListener("keydown", (e) => this.handleEventTrue(e));
  }
  compareCode(e) {
    if (e.repeat) {
      return false;
    }
    return e.code === this.data.NODE_DAT_KEYBOARD_KEY;
  }
}
