import ObjectNode from "./ObjectNode";
import { ControlType } from "../NodeControl";

const nodeType = "Camera";

export default class CameraNode extends ObjectNode {
  static NODE_TYPE = nodeType;

  constructor(name, uuid, objectId, type = "Camera") {
    super(name, uuid, objectId, type);
    this.category = "Object";
    this.data = nodeSchema;
    this.addData(type);
  }
}

const nodeSchema = {
  inputSocket: [
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
  outputSocket: [],
  control: [],
}
