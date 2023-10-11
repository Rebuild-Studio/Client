import MiddleProcess from "../MiddleProcess";

export default class MaterialProcess extends MiddleProcess {
  constructor(nodeRuntime) {
    super(nodeRuntime);
    this.nodeRuntime.setInputDefaultValueAll(undefined);

    switch (this.nodeRuntime.data.NODE_DAT_COMPOSE) {
      case "compose":
        this.calculate = this.compose;
        break;
      case "decompose":
        this.calculate = this.decompose;
        break;
      default:
        this.calculate = undefined;
        break;
    }
    if (!this.calculate) {
      this.setError(
        `MaterialProcess : ${this.nodeRuntime.data.NODE_DAT_COMPOSE} is not available.`
      );
    }
  }
  calculate(inputs) {
    return inputs;
  }
  compose(inputs) {
    const result = {
      Template: inputs[0],
      color: inputs[1],
      metalness: this.setMinMax(0.0, 1.0, inputs[2]),
      roughness: this.setMinMax(0.0, 1.0, inputs[3]),
      ior: this.setMinMax(1.0, 2.333, inputs[4]),
      opacity: this.setMinMax(0.0, 1.0, inputs[5]),
    };
    return [result];
  }

  decompose(inputs) {
    if (inputs[0]) {
      const result = {
        Template: inputs[0].Template,
        color: inputs[0].color,
        metalness: inputs[0].metalness,
        roughness: inputs[0].roughness,
        ior: inputs[0].ior || undefined,
        opacity: inputs[0].opacity,
      };
      return [result];
    } else {
      this.setError(`MaterialProcess : decompose is not available.`);
    }
  }

  setMinMax(min, max, value) {
    if (typeof value !== "undefined") {
      return Math.min(Math.max(value, min), max);
    } else {
      return undefined;
    }
  }
}
