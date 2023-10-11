import ObjectNode from "./ObjectNode";
import { ControlType } from "../NodeControl";

const nodeType = "SpotLight";

export default class SpotLightNode extends ObjectNode {
  static NODE_TYPE = nodeType;

  constructor(name, uuid, objectId, type = nodeType) {
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
  outputSocket: [],
  control: [
    {
      name: "light",
      value: undefined,
      type: ControlType.SpotLight,
      IsDropdown: true,
      extras: "스포트 라이트",
    },
  ],
}
