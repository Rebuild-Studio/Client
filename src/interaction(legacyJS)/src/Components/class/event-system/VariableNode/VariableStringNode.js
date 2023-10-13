import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "VariableString";

export class VariableStringNode extends Node {
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
      name: "string",
      type: ControlType.String,
    },
  ],
  control: [
    {
      name: "string",
      value: "",
      type: ControlType.String,
      tooltip: "출력하고자하는 값을 설정해주세요.",
    },
  ],
};
