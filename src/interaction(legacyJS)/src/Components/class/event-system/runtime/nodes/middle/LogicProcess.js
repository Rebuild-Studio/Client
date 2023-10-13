import MiddleProcess from "./MiddleProcess";

//logic gates
function logicAnd(a, b) {
  return a && b;
}
function logicNand(a, b) {
  return !logicAnd(a, b);
}
function logicNor(a, b) {
  return !logicOr(a, b);
}
function logicNot(a) {
  return !a;
}
function logicOr(a, b) {
  return a || b;
}
function logicXnor(a, b) {
  return !logicXor(a, b);
}
function logicXor(a, b) {
  return a !== b;
}

//makeArray
function makeArray1(inputs, logic) {
  return [logic(inputs[0])];
}
function makeArray2(inputs, logic) {
  return [logic(inputs[0], inputs[1])];
}

export default class LogicProcess extends MiddleProcess {
  constructor(nodeRuntime) {
    super(nodeRuntime);
    this.makeArray = makeArray2;
    switch (this.data.LogicGate) {
      case "And":
        this.logic = logicAnd;
        break;
      case "Nand":
        this.logic = logicNand;
        break;
      case "Nor":
        this.logic = logicNor;
        break;
      case "Not":
        this.makeArray = makeArray1;
        this.logic = logicNot;
        break;
      case "Or":
        this.logic = logicOr;
        break;
      case "Xor":
        this.logic = logicXor;
        break;
      case "Xnor":
        this.logic = logicXnor;
        break;
      default:
        console.warn(`LogicProcess: Unknown type: ${this.data.LogicGate}`);
        break;
    }
  }
  logic() {
    return false;
  }

  calculate(inputs) {
    return this.makeArray(inputs, this.logic);
  }
}