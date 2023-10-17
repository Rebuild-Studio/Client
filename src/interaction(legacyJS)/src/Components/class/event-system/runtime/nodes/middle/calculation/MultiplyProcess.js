import MiddleProcess from "../MiddleProcess";

export default class MultiplyProcess extends MiddleProcess {
  calculate(inputs) {
    return [inputs[0] * inputs[1]];
  }
}