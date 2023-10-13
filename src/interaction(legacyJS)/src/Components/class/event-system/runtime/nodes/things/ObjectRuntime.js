import ThingRuntime from "./ThingRuntime";
import ObjectProcess from "./ObjectProcess";
import ObjectMaterialProcess from "./ObjectMaterialProcess";
import ObjectAnimationProcess from "./ObjectAnimationProcess";
import { generateKeyFormat, extractKeyFormat } from "../../utils";
import { ControlType } from "../../../NodeControl";

export default class ObjectRuntime extends ThingRuntime {
  constructor(args) {
    super(args);
    this.inputKeys.forEach((key) => {
      if (key.includes(generateKeyFormat(undefined, ControlType.Material))) {
        this.processes.push(
          new ObjectMaterialProcess(
            this,
            key,
            extractKeyFormat(key, ControlType.Material)
          )
        );
      } else if (
        key.includes(generateKeyFormat(undefined, ControlType.Animation))
      ) {
        this.processes.push(
          new ObjectAnimationProcess(
            this,
            key,
            extractKeyFormat(key, ControlType.Animation)
          )
        );
      } else {
        this.processes.push(new ObjectProcess(this, key));
      }
    });
  }
}
