import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "ConstColor";

export class ConstColorNode extends Node {
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
      name: "color",
      type: ControlType.Color,
      reference: {
        name: "NODE_DAT_MATERIAL",
        defaultValue: { h: 0, s: 0, v: 100, a: 1 },
        type: "Color",
        tooltipMessage: "출력하고자하는 컬러를 설정해주세요",
      },
    },
  ],
};