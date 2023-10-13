import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "VariableNumber";

export class VariableNumberNode extends Node {
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
      name: "number",
      type: ControlType.Number,
      reference: {
        name: "NODE_DAT_NUMBER",
        defaultValue: 0,
        type: "Number",
        tooltipMessage: "출력하고자하는 숫자를 설정해주세요",
      },
    },
  ],
  control: [
    {
      name: "uxSelector",
      value: "",
      type: ControlType.String,
      IsUxSelector: true,
    },
  ],
};
