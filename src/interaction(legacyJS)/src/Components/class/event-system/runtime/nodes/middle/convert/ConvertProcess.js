import { Color, Vector3 } from "three";
import MiddleProcess from "../MiddleProcess";

export default class ConvertProcess extends MiddleProcess {
  constructor(nodeRuntime) {
    super(nodeRuntime);
    switch (this.nodeRuntime.data.convert) {
      case "BooleanToNumber":
        this.calculate = this.convertBooleanToNumber;
        break;
      case "ColorToNumber":
        this.calculate = this.convertColorToNumber;
        break;
      case "NumberToBoolean":
        this.calculate = this.convertNumberToBoolean;
        break;
      case "NumberToVector3":
        this.calculate = this.convertNumberToVector3;
        break;
      case "NumberToColor":
        this.calculate = this.convertNumberToColor;
        break;
      case "Vector3ToNumber":
        this.calculate = this.convertVector3ToNumber;
        break;
      default:
        break;
    }
    if (!this.calculate) {
      this.setError(
        `ConvertNodeProcess : convert ${this.nodeRuntime.data.convert} is not available.`
      );
    }
  }

  calculate(inputs) {
    return inputs;
  }

  convertBooleanToNumber(inputs) {
    return inputs.map((input) => {
      return Number(input);
    });
  }

  convertColorToNumber(inputs) {
    return inputs[0].toArray();
  }

  convertNumberToBoolean(inputs) {
    return inputs.map((input) => {
      return Boolean(input);
    });
  }

  convertNumberToColor(inputs) {
    return [new Color(...inputs)];
  }

  convertNumberToVector3(inputs) {
    return [new Vector3(...inputs)];
  }

  convertVector3ToNumber(inputs) {
    return inputs[0].toArray();
  }
}
