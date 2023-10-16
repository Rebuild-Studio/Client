import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "Calculation";

export class CalculationNode extends Node {
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
      name: "number",
      type: ControlType.Number,
    },
  ],
  control: [
    {
      name: "calculation",
      value: "Plus",
      type: ControlType.Calculation,
      IsDropdown: true,
    },
  ],
}

