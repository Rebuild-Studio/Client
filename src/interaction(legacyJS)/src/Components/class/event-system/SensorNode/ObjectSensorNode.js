import Node from '../Node';
import { ControlType } from '../NodeControl';

const nodeType = 'ObjectSensor';

export class ObjectSensorNode extends Node {
  static NODE_TYPE = nodeType;

  constructor(name, uuid, objectId, type = nodeType) {
    super(name, uuid, type);
    this.category = 'Sensor';
    this.data = nodeSchema;
    this.addData(type);
  }
}

const nodeSchema = {
  inputSocket: [],
  outputSocket: [
    {
      name: 'position',
      type: ControlType.Vector3
    },
    {
      name: 'rotation',
      type: ControlType.Vector3
    },
    {
      name: 'scale',
      type: ControlType.Vector3
    }
  ],
  referenceParameter: [
    {
      name: 'NODE_DAT_OBJECT',
      defaultValue: '',
      type: 'Object',
      tooltipMessage: '오브젝트를 선택해 주세요'
    }
  ]
};
