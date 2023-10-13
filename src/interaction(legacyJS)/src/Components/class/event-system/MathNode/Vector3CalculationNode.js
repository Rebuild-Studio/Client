import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "Vector3Calculation";

export class Vector3CalculationNode extends Node {
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
      name: "vector3First",
      type: ControlType.Vector3,
    },
    {
      name: "vector3Second",
      type: ControlType.Vector3,
    },
  ],
  outputSocket: [
    {
      name: "vector3",
      type: ControlType.Vector3,
    },
  ],
  control: [
    {
      name: "vectorCalculation",
      value: "Plus",
      type: ControlType.Vector3Calculation,
      IsDropdown: true,
    },
  ],
}
