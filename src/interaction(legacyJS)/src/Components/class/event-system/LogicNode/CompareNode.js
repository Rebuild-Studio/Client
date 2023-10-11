import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "Compare";

export class CompareNode extends Node {
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
      name: "numberFirst",
      type: ControlType.Number,
    },
    {
      name: "numberSecond",
      type: ControlType.Number,
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
      name: "NODE_DAT_COMPARE_OPERATOR",
      value: "==",
      type: ControlType.Compare,
      IsDropdown: true,
    },
  ],
}
