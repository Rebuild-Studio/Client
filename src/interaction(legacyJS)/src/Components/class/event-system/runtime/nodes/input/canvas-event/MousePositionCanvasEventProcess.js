import { Vector3 } from "three";
import CanvasEventProcess from "./CanvasEventProcess";

export default class MousePositionCanvasEventProcess extends CanvasEventProcess {
  constructor(nodeRuntime) {
    super(nodeRuntime);
    this.registerEventListener('click', (e) => this.handleEvent(e));
  }
  handleEvent(e) {
    if (!this.width || !this.height) {
      return;
    }
    if (this.compareCode(e)) {
      const vector = new Vector3(
        2 * e.offsetX / this.width - 1,
        2 * e.offsetY / this.height - 1,
        0
      );
      this.nodeRuntime.setOutputDefaultValueIndex(0, vector);
    }
  }
  compareCode(e) {
    return e.button === 0;
  }
  //TODO observe state change
  work(state, delta, xrFrame) {
    this.width = state.size.width;
    this.height = state.size.height;
  }
}