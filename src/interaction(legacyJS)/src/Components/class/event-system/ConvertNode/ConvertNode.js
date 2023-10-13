import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "Convert";

export class ConvertNode extends Node {
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
      name: "convert",
      value: undefined,
      type: ControlType.Convert,
    },
  ],
};
