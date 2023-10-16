import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "MouseRaycast";

export class MouseRaycastNode extends Node {
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
  control: [
    {
      name: "object",
      value: undefined,
      type: ControlType.Object,
    },
    {
      name: "NODE_DAT_HOLD",
      value: "Spot",
      type: ControlType.Action,
      label: true,
    },
  ],
}
