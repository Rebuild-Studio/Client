import MiddleProcess from "./MiddleProcess";

export default class DigitizeProcess extends MiddleProcess {
  constructor(nodeRuntime) {
    super(nodeRuntime);
    this.step = this.data.NODE_DAT_DIVISOR - 1;
  }
  calculate(inputs) {
    return [Math.round(inputs[0] * this.step) / this.step];
  }
}