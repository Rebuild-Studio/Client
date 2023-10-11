import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "CameraSensor";

export class CameraSensorNode extends Node {
  static NODE_TYPE = nodeType;

  constructor(name, uuid, objectId, type = nodeType) {
    super(name, uuid, type);
    this.category = "Sensor";
    this.data = nodeSchema;
    this.addData(type);
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
      name: "fov",
      type: ControlType.Number,
    },
    {
      name: "near",
      type: ControlType.Number,
    },
    {
      name: "far",
      type: ControlType.Number,
    },
  ],
  control: [],
}
