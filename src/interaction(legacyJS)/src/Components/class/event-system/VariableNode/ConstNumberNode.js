import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "ConstNumber";

export class ConstNumberNode extends Node {
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
        name: "NODE_DAT_CONSTANT_NUMBER",
        defaultValue: 0,
        type: "Number",
        tooltipMessage: "",
      }
    },
  ],
};
