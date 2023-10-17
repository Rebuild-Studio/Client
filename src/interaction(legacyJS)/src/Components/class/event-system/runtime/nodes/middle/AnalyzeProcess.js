import MiddleProcess from "./MiddleProcess";

function calculateAbsolute(inputs) {
  return [Math.abs(inputs[0])];
}

function calculateSquareRoot(inputs) {
  return [inputs[0] > 0 ? Math.sqrt(inputs[0]) : 0];
}

export default class AnalyzeProcess extends MiddleProcess {
  constructor(nodeRuntime) {
    super(nodeRuntime);
    switch (this.data.symbol) {
      case "SquareRoot":
        this.calculate = calculateSquareRoot;
        break;
      case "Absolute":
        this.calculate = calculateAbsolute;
        break;
      default:
        console.warn(`AnalyzeProcess: Unknown type: ${this.data.symbol}`);
        break;
    }
  }
  calculate(inputs) {
    return inputs;
  }
}
