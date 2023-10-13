import MiddleProcess from "../MiddleProcess";

export default class DivideProcess extends MiddleProcess {
  calculate(inputs) {
    return [inputs[1] ? inputs[0] / inputs[1] : 0];
  }
}