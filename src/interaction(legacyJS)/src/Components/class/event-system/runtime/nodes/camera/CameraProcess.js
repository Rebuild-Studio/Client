import NodeProcess from "../NodeProcess";
import { Euler } from "three";

//FIXME: ObjectProcess와 코드 유사
export default class CameraProcess extends NodeProcess {
  constructor(nodeRuntime, key) {
    super(nodeRuntime, [], [key], []);
    this.key = key;
    this.nodeRuntime.setInputDefaultValue(key, undefined);
    if (this.key === "rotation") {
      this.convert = this.convertVector3ToEuler;
    }
    const target = this.nodeRuntime.camera[this.key];
    if (target.clone && target.copy) {
      this.getCameraProp = this.getCameraPropClone;
      this.setCameraProp = this.setCameraPropCopy;
    } else {
      this.getCameraProp = this.getCameraPropDefault;
      this.setCameraProp = this.setCameraPropDefault;
    }
  }
  convert(value) {
    return value;
  }
  convertVector3ToEuler(vector) {
    return vector ? new Euler(vector.x, vector.y, vector.z) : undefined;
  }
  getCameraPropDefault() {
    return this.nodeRuntime.camera[this.key];
  }
  getCameraPropClone() {
    return this.nodeRuntime.camera[this.key].clone();
  }
  setCameraPropDefault(value) {
    this.nodeRuntime.camera[this.key] = value;
    this.nodeRuntime.isCameraParameterChanged = true;
  }
  setCameraPropCopy(value) {
    this.nodeRuntime.camera[this.key].copy(value);
  }
  start() {
    try {
      this.initialValue = this.getCameraProp();
    } catch (e) {
      this.setError(`CameraRuntime: get ${this.key} is not available.`);
    }
  }
  coreWork(state, delta, xrFrame) {
    try {
      const value = this.convert(this.inputs[this.key]);
      if (typeof value !== "undefined") {
        this.setCameraProp(value);
      }
    } catch (e) {
      this.setError(`CameraRuntime: set ${this.key} is not available.`);
    }
  }
  end() {
    try {
      this.setCameraProp(this.initialValue);
    } catch (e) {
      this.setError(`CameraRuntime: set ${this.key} is not available.`);
    }
  }
}
