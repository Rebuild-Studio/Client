import MiddleProcess from "../MiddleProcess";
import * as THREE from "three";

export default class AddProcess extends MiddleProcess {
  calculate(inputs) {
    const ret = new THREE.Vector3();
    if (inputs[0]) {
      ret.copy(inputs[0]);
    }
    if (inputs[1]) {
      ret.add(inputs[1]);
    }
    return [ret];
  }
}
