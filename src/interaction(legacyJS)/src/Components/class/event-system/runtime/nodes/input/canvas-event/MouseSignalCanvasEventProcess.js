import CanvasEventProcess from "./CanvasEventProcess";

// TODO : Merge feature - MouseSignalCanvasEventProcess / MouseRaycast
// Set Mouse Button Type static
export default class MouseSignalCanvasEventProcess extends CanvasEventProcess {
  constructor(nodeRuntime) {
    super(nodeRuntime);
    this.mouseButton = this.getButton();
    if (this.data.NODE_DAT_HOLD === "Hold") {
      this.Outputs([false], true);
      this.registerEventListener("mousedown", (e) => this.handleEventTrue(e));
      this.registerEventListener("mouseup", (e) => this.handleEventFalse(e));
    } else {
      this.nodeRuntime.setOutputDefaultValueIndex(0, false);
      this.registerEventListener("click", (e) => this.handleEventTrue(e));
    }
  }
  getButton() {
    switch (this.data.NODE_DAT_MOUSE_BUTTON_TYPE) {
      case "LeftButton":
        return 0;
      case "WheelButton":
        return 1;
      case "RightButton":
        return 2;
    }
  }
  compareCode(e) {
    return e.button === this.mouseButton;
  }
}
