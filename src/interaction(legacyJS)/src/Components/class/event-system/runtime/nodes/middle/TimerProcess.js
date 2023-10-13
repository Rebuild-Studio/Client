import MiddleProcess from "./MiddleProcess";

export default class TimerProcess extends MiddleProcess {
  constructor(nodeRuntime) {
    super(nodeRuntime);
    this.nodeRuntime.setOutputDefaultValueIndex(0, false);
  }
  calculate(inputs) {
    if (inputs[0]) {
      if (!this.timeoutID) {
        this.timeoutID = setTimeout(() => {
          this.nodeRuntime.setOutputDefaultValueIndex(0, true);
          this.timeoutID = setTimeout(() => {
            this.nodeRuntime.setOutputDefaultValueIndex(0, false);
            this.timeoutID = null;
          }, inputs[2] * 1000);
        }, inputs[1] * 1000);
      }
    }
    return [false];
  }
  end() {
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
  }
}
