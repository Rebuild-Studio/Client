import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "Function";

export class FunctionNode extends Node {
  static NODE_TYPE = nodeType;

  constructor(name, uuid, type = nodeType) {
    super(name, uuid, type);
    this.data = nodeSchema;
    this.addData(type);
  }
}

const nodeSchema = {
  inputSocket: [],
  outputSocket: [],
  control: [
    {
      name: "function",
      value: undefined,
      type: ControlType.Function,
      IsDropdown: true,
      extras: "함수",
    },
  ],
};
