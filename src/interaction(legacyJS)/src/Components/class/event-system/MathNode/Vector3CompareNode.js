import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "Vector3Compare";

export class Vector3CompareNode extends Node {
  static NODE_TYPE = nodeType;

  constructor(name, uuid, type = nodeType) {
    super(name, uuid, type);
    this.data = nodeSchema;
    this.addData(type);
  }
}

const nodeSchema = {
  inputSocket: [
    {
      name: "vector3First",
      type: ControlType.Vector3,
    },
    {
      name: "vector3Second",
      type: ControlType.Vector3,
    },
  ],
  outputSocket: [
    {
      name: "Boolean",
      type: ControlType.Boolean,
    },
  ],
  control: [
    {
      name: "NODE_DAT_COMPARE_OPERATOR",
      value: "=",
      type: ControlType.Vector3Compare,
      IsDropdown: true,
    },
  ],
};
