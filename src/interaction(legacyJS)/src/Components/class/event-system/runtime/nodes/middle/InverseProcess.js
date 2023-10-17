import MiddleProcess from "./MiddleProcess";

export default class InverseProcess extends MiddleProcess {
  calculate(inputs) {
    return [-inputs[0]];
  }
}