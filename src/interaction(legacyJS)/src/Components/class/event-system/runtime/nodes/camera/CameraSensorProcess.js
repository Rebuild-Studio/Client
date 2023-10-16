import NodeProcess from "../NodeProcess";
import { Vector3 } from "three";

export default class CameraSensorProcess extends NodeProcess {
  constructor(nodeRuntime, key) {
    super(nodeRuntime, [], [], [key]);
    this.key = key;
    if (["position", "rotation"].includes(key)) {
      this.convert = this.convertValueToVector3;
    }
    this.changed = true;
  }
  convert(value) {
    return value;
  }
  convertValueToVector3(value) {
    return new Vector3(value.x, value.y, value.z);
  }
  readValues() {}
  coreWork(state, delta, xrFrame) {
    try {
      const value = this.convert(this.nodeRuntime.camera[this.key]);
      this.Output(0, value);
    } catch (e) {
      this.setError(
        `SensorRuntime: get ${this.key} of MetaObject is not available.`
      );
    }
  }
}
