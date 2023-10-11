import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "SpotLightSensor";

export class SpotLightSensorNode extends Node {
  static NODE_TYPE = nodeType;

  constructor(name, uuid, objectId, type = "SpotLightSensor") {
    super(name, uuid, type);
    this.category = "Sensor";
    this.objectId = objectId;
    this.data = nodeSchema;
  }
}

const nodeSchema = {
  inputSocket: [],
  outputSocket: [
    {
      name: "position",
      type: ControlType.Vector3,
    },
    {
      name: "rotation",
      type: ControlType.Vector3,
    },
    {
      name: "color",
      type: ControlType.Color,
    },
    {
      name: "intensity",
      type: ControlType.Number,
    },
    {
      name: "softness",
      type: ControlType.Number,
    },
    {
      name: "resolution",
      type: ControlType.Number,
    },
    {
      name: "blur",
      type: ControlType.Number,
    },
    {
      name: "coneangle",
      type: ControlType.Number,
    },
    {
      name: "penumbra",
      type: ControlType.Number,
    },
    {
      name: "visible",
      type: ControlType.Boolean,
    },
  ],
  control: [
    {
      name: "light",
      value: undefined,
      type: ControlType.SpotLight,
      IsDropdown: true,
      extras: "스포트 라이트",
    },
  ],
};
