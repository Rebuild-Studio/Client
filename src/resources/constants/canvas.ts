type CanvasInstance =
  | "OBJECT"
  | "CUBE"
  | "CAPSULE"
  | "CONE"
  | "CYLINDER"
  | "SPHERE"
  | "TORUS"
  | "GROUP"
  | "SELECTED_GROUP"
  | "MATERIAL"
  | "CAMERA"
  | "POINTLIGHT"
  | "SPOTLIGHT"
  | "INITIAL";
type CanvasAttribute =
  | "add"
  | "position"
  | "rotation"
  | "scale"
  | "delete"
  | "ungroup"
  | "none"
  | "change";

type InstanceTranslate = {
  [attr in CanvasInstance]: string;
};

type AttributeTranslate = {
  [attr in CanvasAttribute]: string;
};

const instance_translate: InstanceTranslate = {
  OBJECT: "오브젝트",
  CUBE: "정육면체",
  CAPSULE: "캡슐",
  CONE: "원뿔",
  CYLINDER: "원기둥",
  SPHERE: "구",
  TORUS: "도넛",
  MATERIAL: "머터리얼",
  GROUP: "그룹",
  SELECTED_GROUP: "선택 그룹",
  CAMERA: "카메라",
  POINTLIGHT: "포인트 라이트",
  SPOTLIGHT: "스포트 라이트",
  INITIAL: "초기상태",
};

const attr_translate: AttributeTranslate = {
  add: "추가",
  position: "변형 (position)",
  rotation: "변형 (rotation)",
  scale: "변형 (scale)",
  delete: "삭제",
  ungroup: "해제",
  change: "변형",
  none: "",
};
export type { CanvasInstance, CanvasAttribute };
export { instance_translate, attr_translate };
