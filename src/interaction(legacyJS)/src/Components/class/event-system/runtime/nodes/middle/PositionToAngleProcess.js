import MiddleProcess from "./MiddleProcess";

export default class PositionToAngleProcess extends MiddleProcess {
  calculate(inputs) {
    if (typeof inputs[0] === "undefined") {
      return [0];
    }
    return [Math.atan2(inputs[0].y, inputs[0].x)];
  }
}