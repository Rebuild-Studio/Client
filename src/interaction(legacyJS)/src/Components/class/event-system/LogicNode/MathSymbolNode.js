import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "MathSymbol";

export class MathSymbolNode extends Node {
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
      name: "number",
      type: ControlType.Number,
    },
  ],
  outputSocket: [
    {
      name: "number",
      type: ControlType.Number,
    },
  ],
  control: [
    {
      name: "symbol",
      value: "SquareRoot",
      type: ControlType.MathSymbol,
      IsDropdown: true,
    },
  ],
}
