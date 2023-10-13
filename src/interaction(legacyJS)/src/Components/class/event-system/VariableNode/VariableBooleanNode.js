import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "VariableBoolean";

export class VariableBooleanNode extends Node {
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
      name: "boolean",
      type: ControlType.Boolean,
    },
  ],
  control: [
    {
      name: "boolean",
      value: true,
      type: ControlType.Boolean,
      tooltip: "출력하고자하는 값을 설정해주세요.",
    },
  ],
};