import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "Keyboard";

export class KeyboardNode extends Node {
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
      name: "signal",
      type: ControlType.Boolean,
    },
  ],
  referenceParameter: [
    {
      name: "NODE_DAT_KEYBOARD_KEY",
      defaultValue: "input",
      type: "KeyboardInput",
      tooltipMessage: "입력 받을 키를 입력해주십시오.",
    },
    {
      name: "NODE_DAT_KEYBOARD_ACTION",
      defaultValue: "spot",
      type: "KeyboardAction",
      tooltipMessage: "키보드 액션 형태를 선택해 주십시오.",
    },
  ],
}