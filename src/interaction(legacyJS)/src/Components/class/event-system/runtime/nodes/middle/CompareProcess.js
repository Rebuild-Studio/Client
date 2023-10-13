import MiddleProcess from "./MiddleProcess";

function Equality(inputs) {
  return [Math.abs(inputs[0] - inputs[1]) < Number.EPSILON];
}

function GreaterThan(inputs) {
  return [inputs[0] > inputs[1]];
}

function GreaterThanOrEqual(inputs) {
  return [inputs[0] >= inputs[1]];
}

function LessThan(inputs) {
  return [inputs[0] < inputs[1]];
}

function LessThanOrEqual(inputs) {
  return [inputs[0] <= inputs[1]];
}

function InEquality(inputs) {
  return [Math.abs(inputs[0] - inputs[1]) >= Number.EPSILON];
}

export default class CompareProcess extends MiddleProcess {
  constructor(nodeRuntime) {
    super(nodeRuntime);
    switch (this.data.NODE_DAT_COMPARE_OPERATOR) {
      case "=":
      case "==":
      case "===":
        this.calculate = Equality;
        break;
      case ">":
        this.calculate = GreaterThan;
        break;
      case ">=":
      case "=>":
        this.calculate = GreaterThanOrEqual;
        break;
      case "<":
        this.calculate = LessThan;
        break;
      case "<=":
      case "=<":
        this.calculate = LessThanOrEqual;
        break;
      case "!=":
      case "!==":
      case "<>":
        this.calculate = InEquality;
        break;
      default:
        break;
    }
  }
  calculate() {
    return [false];
  }
}