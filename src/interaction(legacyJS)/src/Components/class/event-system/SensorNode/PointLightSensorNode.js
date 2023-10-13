import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "PointLightSensor";

export class PointLightSensorNode extends Node {
  static NODE_TYPE = nodeType;

  constructor(name, uuid, objectId, type = nodeType) {
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
      name: "visible",
      type: ControlType.Boolean,
    },
  ],
  control: [
    {
      name: "light",
      value: undefined,
      type: ControlType.PointLight,
      IsDropdown: true,
      extras: "포인트 라이트",
    },
  ],
};
