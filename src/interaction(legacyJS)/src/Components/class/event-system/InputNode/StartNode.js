import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "Timer";

export class StartNode extends Node {
  static NODE_TYPE = nodeType;

  constructor(name, uuid, type = nodeType) {
    super(name, uuid, type);
    this.data = nodeSchema;
    this.addData(type);
  }
}

const nodeSchema = {
  inputSocket: [],
  outputSocket: [
    {
      name: "signal",
      type: ControlType.Boolean,
    },
  ],
}