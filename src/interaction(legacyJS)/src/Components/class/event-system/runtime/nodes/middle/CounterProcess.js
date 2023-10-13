import MiddleProcess from "./MiddleProcess";

export default class CounterProcess extends MiddleProcess {
  constructor(nodeRuntime) {
    super(nodeRuntime);
    this.defaultValue = this.data.NODE_DAT_DEFAULT_VALUE;
    this.mode = this.data.NODE_DAT_COUNTER_MODE;
    this.range = this.data.NODE_DAT_COUNTER_RANGE;
    this.timing = this.data.NODE_COUNTER_TIMING;
    this.length = this.range[1] - this.range[0];
    switch (this.mode) {
      case "No Limit":
        this.setResultByMode = this.NoLimit;
        break;
      case "Range":
        this.setResultByMode = this.Range;
        break;
      case "Loop":
        this.setResultByMode = this.Loop;
        break;
      case "Bounce":
        this.setResultByMode = this.Bounce;
        break;
      default:
        break;
    }
    this.result = this.defaultValue;
  }
  start() {
    this.changed = true;
  }
  readValues() {
    for (const key of this.inputKeys) {
      const read = this.nodeRuntime.inputs[key];
      this.changed = this.changed || read.changed;
      this.inputs[key] = read.value;
    }
  }
  setResultByMode(result) {
    return result;
  }
  NoLimit(result) {
    return result;
  }
  Range(result) {
    if (result > this.range[1]) {
      result = this.range[1];
    } else if (result < this.range[0]) {
      result = this.range[0];
    }
    return result;
  }
  Loop(result) {
    if (result > this.range[1]) {
      result -= this.length;
    } else if (result < this.range[0]) {
      result += this.length;
    }
    return result;
  }
  Bounce(result) {
    if (result >= this.range[1]) {
      result = this.range[1];
      this.switch();
    } else if (result < this.range[0]) {
      result = this.range[0];
      this.switch();
    }
    return result;
  }
  countUp(value) {
    if (value !== this.timing) {
      this.result += value;
    }
  }
  countDown(value) {
    if (value !== this.timing) {
      this.result -= value;
    }
  }
  switch() {
    const tmp = this.countUp;
    this.countUp = this.countDown;
    this.countDown = tmp;
  }
  calculate(inputs) {
    this.countUp(inputs[0]);
    this.countDown(inputs[1]);
    if (inputs[2]) {
      this.result = this.defaultValue;
    }
    this.result = this.setResultByMode(this.result);
    this.result = Math.round(this.result * 100) * 0.01;
    return [this.result];
  }
}
