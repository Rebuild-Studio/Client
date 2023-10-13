import MiddleProcess from "./MiddleProcess";
import * as THREE from "three";

function equals(inputs) {
  let ret = false;
  const v = new THREE.Vector3();
  if (inputs[0]) {
    v.copy(inputs[0]);
  }
  if (inputs[1]) {
    ret = v.equals(inputs[1]);
  }
  return ret;
}

function Equality(inputs) {
  return [equals(inputs)];
}

function InEquality(inputs) {
  return [!equals(inputs)];
}

export default class VectorCompareProcess extends MiddleProcess {
  constructor(nodeRuntime) {
    super(nodeRuntime);
    switch (this.data.NODE_DAT_COMPARE_OPERATOR) {
      case "=":
        this.calculate = Equality;
        break;
      case "≠":
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
