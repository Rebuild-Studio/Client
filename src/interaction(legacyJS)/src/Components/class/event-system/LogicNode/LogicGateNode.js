import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "LogicGate";

export class LogicGateNode extends Node {
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
      name: "booleanFirst",
      type: ControlType.Boolean,
    },
    {
      name: "booleanSecond",
      type: ControlType.Boolean,
    },
  ],
  outputSocket: [
    {
      name: "boolean",
      type: ControlType.Boolean,
    },
  ],
  control: [
    {
      name: "LogicGate",
      value: "And",
      type: ControlType.LogicGate,
      IsDropdown: true,
    },
  ],
};
