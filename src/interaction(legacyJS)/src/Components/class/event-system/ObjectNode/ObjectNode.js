import { reaction } from 'mobx';
import { objectViewModel } from '../../../view_models/Object_VM';
import Node from '../Node';
import { ControlType } from '../NodeControl';

const nodeType = 'Object';

export default class ObjectNode extends Node {
  static NODE_TYPE = nodeType;
  objectId = null;
  childNode = [];
  parentNode = [];
  enable = true;

  constructor(name, uuid, objectId, type = nodeType) {
    super(name, uuid, type);
    this.category = 'Object';
    this.setObject(objectId);
    this.data = nodeSchema;
    this.addData(type);
  }

  get object() {
    console.warn('ObjectNode.object is deprecated.');
    return this.objectId;
  }

  disposers = [
    reaction(
      () =>
        objectViewModel.metaObjects.find((mo) => mo.objectId === this.objectId),
      (e) => {
        if (e === undefined) this.setEnable(false);
      }
    ),
    reaction(
      () =>
        objectViewModel.metaObjects.find((mo) => mo.objectId === this.objectId)
          ?.name,
      (e) => {
        if (e === undefined) return;
        this.name = e;
      }
    )
  ];

  setEnable(enable) {
    this.name = 'Broken Reference : ' + this.name;
    this.enable = enable;
  }

  dispose() {
    super.dispose();
    this.disposer();
    this.disposers.forEach((disposer) => disposer());
  }
}

const nodeSchema = {
  inputSocket: [
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
    },
    {
      name: 'visible',
      type: ControlType.Boolean
    }
  ],
  outputSocket: [],
  referenceParameter: [
    {
      name: 'NODE_DAT_OBJECT',
      defaultValue: '',
      type: 'Object',
      tooltipMessage: '오브젝트를 선택해 주세요'
    }
  ]
};
