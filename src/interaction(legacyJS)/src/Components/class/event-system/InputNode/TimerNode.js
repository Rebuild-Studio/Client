import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "Timer";

export class TimerNode extends Node {
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
      name: "delay",
      type: ControlType.Number,
      reference: {
        name: "NODE_DAT_TIMER_DELAY",
        defaultValue: 0,
        type: "Number",
        tooltipMessage: "시작 이후 얼마 뒤에 타이머가 시작될지 설정합니다.",
      },
    },
    {
      name: "duration",
      type: ControlType.Number,
      reference: {
        name: "NODE_DAT_TIMER_DELAY_DURATION",
        defaultValue: 0,
        type: "Number",
        tooltipMessage: "얼마 동안 타이머가 활성화될지 설정합니다.",
      },
    },
  ],
  outputSocket: [
    {
      name: "signal",
      type: ControlType.Boolean,
    },
  ],
}