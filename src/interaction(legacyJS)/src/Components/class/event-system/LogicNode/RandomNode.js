import Node from "../Node";
import { ControlType } from "../NodeControl";

/**
 * @description RandomNode class
 *
 *  - Predefined static property form making it's nodes with unique name
 *  - uniqueNodeTypeName() methods in EventSystem_Store.js can use this property
 *
 */

const nodeType = "Random";

export class RandomNode extends Node {
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
      name: "signal",
      type: ControlType.Boolean,
    },
    {
      name: "number",
      type: ControlType.Number,
      reference: {
        name: "NODE_DAT_RANDOM_RANGE_MAX",
        defaultValue: 10,
        type: "Number",
        tooltipMessage: "0부터 최댓값 까지의 실수가 랜덤하게 출력됩니다.",
      },
    },
  ],
  outputSocket: [
    {
      name: "random",
      type: ControlType.Number,
    },
  ],
};