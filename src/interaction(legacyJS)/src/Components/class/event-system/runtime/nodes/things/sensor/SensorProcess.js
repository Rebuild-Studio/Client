import NodeProcess from "../../NodeProcess";
import { Color, Vector3 } from "three";

export default class SensorProcess extends NodeProcess {
  constructor(nodeRuntime, key) {
    super(nodeRuntime, [], [], [key]);
    this.key = key;
  }
  start() {
    // this.lightKey = this.getLightKey();
    this.getValue = this.process();
    this.changed = true;
  }
  // TODO : detectConnection
  detectConnection() {
    return true;
  }
  // getLightKey() {
  //   if (this.nodeRuntime.metaObject.props) {
  //     return Object.keys(this.nodeRuntime.metaObject.lightProps)[0];
  //   } else {
  //     return undefined;
  //   }
  // }
  process() {
    if (!this.detectConnection()) {
      const returnUndefined = () => {
        return undefined;
      };
      return returnUndefined;
    }
    const commonProps = ["position", "rotation", "scale", "visible"];
    if (commonProps.includes(this.key)) {
      return this.processCommonProps();
    } else {
      return this.processLightProps();
    }
  }
  processLightProps() {
    if (this.key === "color") {
      return this.getColorProp;
    } else {
      return this.getLightProp;
    }
  }
  processCommonProps() {
    const value = this.nodeRuntime.metaObject.props[this.key];
    if (value.isVector3) {
      return this.getVector3Prop;
    } else if (value.isEuler) {
      return this.getEulerProp;
    } else {
      return this.getCommonProp;
    }
  }
  getColorProp() {
    return new Color(this.nodeRuntime.metaObject.props[this.key]);
  }
  getLightProp() {
    return this.nodeRuntime.metaObject.props[this.key];
  }
  getVector3Prop() {
    const value = this.nodeRuntime.metaObject.props[this.key];
    return new Vector3(value.x, value.y, value.z);
  }
  getEulerProp() {
    const value = this.nodeRuntime.metaObject.props[this.key];
    const ToDegree = 57.29577951308232;
    return new Vector3(
      value._x * ToDegree,
      value._y * ToDegree,
      value._z * ToDegree
    );
  }
  getCommonProp() {
    return this.nodeRuntime.metaObject.props[this.key];
  }

  readValues() {}
  coreWork(state, delta, xrFrame) {
    try {
      const value = this.getValue();
      this.Output(0, value);
    } catch (e) {
      this.setError(
        `SensorRuntime: get ${this.key} of MetaObject is not available.`
      );
    }
  }
}
