import * as THREE from 'three';
import MiddleProcess from '../MiddleProcess';

export default class MultiplyProcess extends MiddleProcess {
  calculate(inputs) {
    const ret = new THREE.Vector3();
    if (inputs[0]) {
      ret.copy(inputs[0]);
    }
    if (inputs[1]) {
      ret.multiply(inputs[1]);
    }
    return [ret];
  }
}
