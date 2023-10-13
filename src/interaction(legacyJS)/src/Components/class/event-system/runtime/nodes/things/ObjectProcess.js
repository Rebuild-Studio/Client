import NodeProcess from "../NodeProcess";
import { Euler } from "three";

export default class ObjectProcess extends NodeProcess {
  constructor(nodeRuntime, key) {
    super(nodeRuntime, [], [key], []);
    this.key = key;
    this.nodeRuntime.setInputDefaultValue(key, undefined);
    if (this.key === "rotation") {
      this.convert = this.convertVector3ToEuler;
    }

    switch (this.nodeRuntime.node.type) {
      case "PointLight":
      case "SpotLight":
        this.setProp = this.setPropLight;
        break;
      default:
        this.setProp = this.setPropDefault;
        break;
    }
  }
  convert(value) {
    return value;
  }
  convertVector3ToEuler(vector) {
    const ToRadian = 0.017453292519943295;
    return vector
      ? new Euler(vector.x * ToRadian, vector.y * ToRadian, vector.z * ToRadian)
      : undefined;
  }
  setPropDefault(value) {
    this.nodeRuntime.metaObject.SetProps(this.key, value);
  }
  setPropLight(value) {
    this.nodeRuntime.metaObject.SetProps(this.key, value); //Change SetLightProps => SetProps
  }
  coreWork(state, delta, xrFrame) {
    try {
      const value = this.convert(this.inputs[this.key]);
      if (typeof value !== "undefined") {
        this.setProp(value);
      }
    } catch (e) {
      this.setError(
        `ObjectRuntime: set ${this.key} of MetaObject is not available.`
      );
    }
  }
}
