import MiddleProcess from "../MiddleProcess";

export default class SubtractProcess extends MiddleProcess {
  calculate(inputs) {
    return [inputs[0] - inputs[1]];
  }
}