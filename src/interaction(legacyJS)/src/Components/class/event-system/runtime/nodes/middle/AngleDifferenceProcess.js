import MiddleProcess from "./MiddleProcess";

export default class AngleDifferenceProcess extends MiddleProcess {
  calculate(inputs) {
    return [(inputs[0] - inputs[1] + Math.PI) % (2 * Math.PI) - Math.PI];
  }
}