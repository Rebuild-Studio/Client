import MiddleProcess from "./MiddleProcess";

export default class ChangedProcess extends MiddleProcess {
  constructor(nodeRuntime) {
    super(nodeRuntime);
    this.readyToChange = true;
  }
  calculate(inputs) {
    if (inputs(0)) {
      if (this.readyToChange) {
        return true;
      }
    } else {
      this.readyToChange = true;
    }
    return false;
  }
}