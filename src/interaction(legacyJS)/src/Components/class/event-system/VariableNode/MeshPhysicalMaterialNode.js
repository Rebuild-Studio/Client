import Node from "../Node";
import { ControlType } from "../NodeControl";

const nodeType = "MeshPhysicalMaterial";

export class MeshPhysicalMaterialNode extends Node {
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
      name: "material",
      type: ControlType.Material,
      reference: {
        name: "NODE_DAT_MATERIAL",
        defaultValue: 0,
        type: "Material",
        tooltipMessage: "출력하고자하는 머터리얼을 설정해주세요",
      },
    },
  ],
  control: [
    {
      name: "NODE_DAT_COMPOSE",
      value: undefined,
      type: ControlType.Compose,
    },
  ],
};
