import MiddleProcess from "../MiddleProcess";

export default class AddProcess extends MiddleProcess {
  calculate(inputs) {
    return [inputs[0] + inputs[1]];
  }
}