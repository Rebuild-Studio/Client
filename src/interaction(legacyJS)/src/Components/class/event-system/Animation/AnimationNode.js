import Node from '../Node';
import { ControlType } from '../NodeControl';

const nodeType = 'Animation';

export class AnimationNode extends Node {
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
      name: 'timeScale',
      type: ControlType.Number,
      reference: {
        name: 'NODE_DAT_ANIMATION_TIME_SCALE',
        defaultValue: 0,
        type: 'Number',
        tooltipMessage:
          '애니메이션의 속도를 설정합니다. 0 ~ 1 사이의 값으로 설정합니다.'
      }
    },
    {
      name: 'weight',
      type: ControlType.Number,
      reference: {
        name: 'NODE_DAT_ANIMATION_WEIGHT',
        defaultValue: 0,
        type: 'Number',
        tooltipMessage:
          '애니메이션의 영향도를 설정합니다. 0 ~ 1 사이의 값으로 설정합니다.'
      }
    },
    {
      name: 'loop',
      type: ControlType.Boolean,
      reference: {
        name: 'NODE_DAT_ANIMATION_LOOP',
        defaultValue: true,
        type: 'Boolean',
        tooltipMessage: '애니메이션을 반복할것인지 설정합니다. 참/거짓'
      }
    }
  ],
  outputSocket: [],
  referenceParameter: [
    {
      name: 'NODE_DAT_OBJECT',
      defaultValue: '',
      type: 'Object',
      tooltipMessage: '오브젝트를 선택해 주세요'
    },
    {
      name: 'NODE_DAT_ANIMATION_ANIMATIONCLIP',
      defaultValue: '',
      type: 'Animation',
      tooltipMessage: '애니메이션을 선택해 주세요'
    }
  ]
};
