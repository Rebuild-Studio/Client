type CanvasInstance =
  | 'OBJECT'
  | 'CUBE'
  | 'CAPSULE'
  | 'CONE'
  | 'CYLINDER'
  | 'SPHERE'
  | 'TORUS'
  | 'GROUP'
  | 'SELECTED_GROUP'
  | 'MATERIAL'
  | 'CAMERA'
  | 'POINT_LIGHT'
  | 'SPOT_LIGHT'
  | 'INITIAL';
type CanvasAttribute =
  | 'add'
  | 'position'
  | 'rotation'
  | 'scale'
  | 'delete'
  | 'ungroup'
  | 'none'
  | 'change';

type InstanceTranslate = {
  [attr in CanvasInstance]: string;
};

type AttributeTranslate = {
  [attr in CanvasAttribute]: string;
};

const instanceTranslate: InstanceTranslate = {
  OBJECT: '오브젝트',
  CUBE: '정육면체',
  CAPSULE: '캡슐',
  CONE: '원뿔',
  CYLINDER: '원기둥',
  SPHERE: '구',
  TORUS: '도넛',
  MATERIAL: '머터리얼',
  GROUP: '그룹',
  SELECTED_GROUP: '선택 그룹',
  CAMERA: '카메라',
  POINT_LIGHT: '포인트 라이트',
  SPOT_LIGHT: '스포트 라이트',
  INITIAL: '초기상태'
};

const attrTranslate: AttributeTranslate = {
  add: '추가',
  position: '변형 (position)',
  rotation: '변형 (rotation)',
  scale: '변형 (scale)',
  delete: '삭제',
  ungroup: '해제',
  change: '변형',
  none: ''
};

// type guard
const isCanvasInstance = (instance: any): instance is CanvasInstance => {
  const possibleInstances: CanvasInstance[] = [
    'OBJECT',
    'CUBE',
    'CAPSULE',
    'CONE',
    'CYLINDER',
    'SPHERE',
    'TORUS',
    'GROUP',
    'SELECTED_GROUP',
    'MATERIAL',
    'CAMERA',
    'POINT_LIGHT',
    'SPOT_LIGHT',
    'INITIAL'
  ];

  return possibleInstances.includes(instance);
};

const isCanvasAttribute = (attribute: any): attribute is CanvasAttribute => {
  const possibleAttributes: CanvasAttribute[] = [
    'add',
    'position',
    'rotation',
    'scale',
    'delete',
    'ungroup',
    'none',
    'change'
  ];

  return possibleAttributes.includes(attribute);
};

export type { CanvasInstance, CanvasAttribute };
export {
  instanceTranslate,
  attrTranslate,
  isCanvasAttribute,
  isCanvasInstance
};
