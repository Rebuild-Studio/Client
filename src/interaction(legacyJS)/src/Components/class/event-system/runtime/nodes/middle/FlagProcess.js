import MiddleProcess from "./MiddleProcess";

export default class FlagProcess extends MiddleProcess {
  calculate(inputs) {
    if (inputs[0]) {
      if (inputs[1]) {
        return [false];
      } else {
        return [true];
      }
    } else {
      return [false];
    }
  }
}
