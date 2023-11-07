import { SceneJson } from '../scene/scene';

type EditableProperty = {
  Name: string;
  Type: Array<unknown>;
  Control: {
    type: string;
    value: unknown;
  };
  InitialValue: unknown;
  DefaultValue: unknown;
  Basic: unknown;
};

type MxJson = {
  scene: SceneJson;
  interaction: object; // 추후 타입 정의 필요
  editableInteraction: Array<unknown>; // 형태가 정해지지 않음 - 정의 필요
  editableScene: EditableProperty[];
};

export type { MxJson };
