import NodeProcess from "../../NodeProcess";
import { Color } from "three";

export default class MaterialSensorProcess extends NodeProcess {
  constructor(nodeRuntime, key, refKey) {
    super(nodeRuntime, [], [], [key]);
    this.key = key;
    this.refKey = refKey;
    this.changed = true;
  }
  readValues() {}
  coreWork(state, delta, xrFrame) {
    try {
      const value = { ...this.metaObject.materialProps[this.refKey] };
      value.color = new Color(value.color);
      this.Output(0, value);
    } catch (e) {
      this.setError(
        `SensorRuntime: get ${this.key} of MetaObject is not available.`
      );
    }
  }
}
