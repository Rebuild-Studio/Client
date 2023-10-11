import ThingRuntime from "../ThingRuntime";
import MaterialSensorProcess from "./MaterialSensorProcess";
import SensorProcess from "./SensorProcess";
import { generateKeyFormat, extractKeyFormat } from "../../../utils";
import { ControlType } from "../../../../NodeControl";

export default class SensorRuntime extends ThingRuntime {
  constructor(args) {
    super(args);
    this.outputKeys.forEach((key) => {
      if (key.includes(generateKeyFormat(undefined, ControlType.Material))) {
        this.processes.push(
          new MaterialSensorProcess(
            this,
            key,
            extractKeyFormat(key, ControlType.Material)
          )
        );
      } else {
        this.processes.push(new SensorProcess(this, key));
      }
    });
  }
}
