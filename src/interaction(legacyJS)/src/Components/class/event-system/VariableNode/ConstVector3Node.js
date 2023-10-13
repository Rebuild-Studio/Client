import Node from "../Node";
import { ControlType } from "../NodeControl";
import { Vector3 } from "three";

const nodeType = "ConstVector3";

export class ConstVector3Node extends Node {
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
      name: "vector3",
      type: ControlType.Vector3,
    },
  ],
  referenceParameter: [
    {
      name: "NODE_DAT_CONSTANT_VECTOR",
      defaultValue: new Vector3(0, 0, 0),
      type: "Vector3",
      tooltipMessage: "",
    },
  ],
};
