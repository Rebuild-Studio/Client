import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "Counter";

export class CounterNode extends Node {
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
      name: "count_up",
      type: ControlType.Number,
    },
    {
      name: "count_down",
      type: ControlType.Number,
    },
    {
      name: "reset",
      type: ControlType.Boolean,
    },
  ],
  outputSocket: [
    {
      name: "result",
      type: ControlType.Number,
    },
  ],
  control: [
    {
      name: "NODE_DAT_DEFAULT_VALUE",
      value: 0,
      type: ControlType.Number,
      label: true,
      extras: {
        min: -1000,
        max: 1000,
      },
    },
    {
      name: "NODE_DAT_COUNTER_MODE",
      value: "No Limit",
      type: ControlType.Counter,
      label: true,
    },
    {
      name: "NODE_DAT_COUNTER_RANGE",
      value: [0, 1000],
      type: ControlType.Range,
      label: true,
    },
    {
      name: "NODE_DAT_COUNTER_TIMING",
      value: 0,
      type: ControlType.Number,
      label: true,
    },
  ],
}