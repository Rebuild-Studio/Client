import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "Flag";

export class FlagNode extends Node {
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
      name: "on",
      type: ControlType.Boolean,
    },
    {
      name: "off",
      type: ControlType.Boolean,
    },
  ],
  outputSocket: [
    {
      name: "signal",
      type: ControlType.Boolean,
    },
  ],
}