import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "Mouse";

export class MouseNode extends Node {
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
      name: "NODE_DAT_MOUSE_ACTION",
      defaultValue: "spot",
      type: "MouseAction",
      tooltipMessage: "마우스 액션 형태를 선택해 주십시오.",
    },
  ],
  control: [
    {
      name: "object",
      value: undefined,
      type: ControlType.Object,
      IsDropdown: true,
      extras: "오브젝트",
    },
  ],
}
