import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "ConstBoolean";

export class ConstBooleanNode extends Node {
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
      reference: {
        name: "NODE_DAT_CONSTANT_BOOLEAN",
        defaultValue: true,
        type: "Boolean",
        tooltipMessage: "",
      },
    },
  ],
};
