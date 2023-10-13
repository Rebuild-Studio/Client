import { ControlType } from "../NodeControl";
import Node from "../Node";

const nodeType = "Sound";

export class SoundNode extends Node {
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
      name: "재생/일시정지",
      type: ControlType.Boolean,
    },
    {
      name: "정지",
      type: ControlType.Boolean,
    },
    {
      name: "음소거", // ToDo: Volume으로 변경하면 좋을 듯
      type: ControlType.Boolean,
      // reference: {
      //   name: "NODE_DAT_SOUND_VOLUME",
      //   defaultValue: 0,
      //   type: "Number",
      //   tooltipMessage: "사운드의 볼륨을 설정합니다.",
      // },
    },
  ],
  outputSocket: [],
  control: [
    {
      name: "sound",
      value: new Audio(), // ToDo: /public/sound/에 있는 mp3 파일 매핑 필요
      type: ControlType.Sound,
      IsDropdown: true,
      extras: "사운드 트랙",
    },
  ],
};

