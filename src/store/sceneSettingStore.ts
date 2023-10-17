import { observable } from "mobx";

type SceneType = "scene" | "none";

interface SceneSettingColor {
  h: number;
  s: number;
  v: number;
  a: number;
}

interface Scene {
  type: SceneType;

  setType(type: SceneType): void;

  hdriToggle: boolean;
  hdriBackgroundVisibleToggle: boolean;
  hdriIntensity: number;
  hdriXRotation: number;
  hdriYRotation: number;
  hdriZRotation: number;

  setHdriToggle: (state: boolean) => void;
  setHdriBackgroundVisibleToggle: (state: boolean) => void;
  setHdriIntensity: (state: number) => void;
  setHdriXRotation: (state: number) => void;
  setHdriYRotation: (state: number) => void;
  setHdriZRotation: (state: number) => void;

  ambientLightToggle: boolean;
  ambientLightIntensity: number;
  ambientLightColor: SceneSettingColor;

  setAmbientLightToggle: (state: boolean) => void;
  setAmbientLightIntensity: (state: number) => void;
  setAmbientLightColor: (state: SceneSettingColor) => void;

  directionalLightToggle: boolean;
  directionalLightIntensity: number;
  directionalLightColor: SceneSettingColor;

  setDirectionalLightToggle: (state: boolean) => void;
  setDirectionalLightIntensity: (state: number) => void;
  setDirectionalLightColor: (state: SceneSettingColor) => void;

  canvasBackgroundColorToggle: boolean;
  canvasBackgroundColor: SceneSettingColor;

  setCanvasBackgroundColorToggle: (state: boolean) => void;
  setCanvasBackgroundColor: (state: SceneSettingColor) => void;

  isGridVisible: boolean;
  isAxisVisible: boolean;

  setIsGridVisible: (state: boolean) => void;
  setIsAxisVisible: (state: boolean) => void;

  SSAOToggle: boolean;
  bloomToggle: boolean;

  setSSAOToggle: (state: boolean) => void;
  setBloomToggle: (state: boolean) => void;

  templates: string[];

  isOpen: boolean;
  toggleVisibility: () => void;
}

const sceneStore = observable<Scene>({
  type: "none",

  setType(type) {
    sceneStore.type = type;
  },

  // 씬(Scene) 설정 - 환경광
  // 환경이미지
  hdriToggle: true,
  hdriBackgroundVisibleToggle: false,
  hdriIntensity: 1,
  hdriXRotation: 0,
  hdriYRotation: 0,
  hdriZRotation: 0,

  setHdriToggle(state) {
    sceneStore.hdriToggle = state;
  },
  setHdriBackgroundVisibleToggle(state) {
    sceneStore.hdriBackgroundVisibleToggle = state;
  },
  setHdriIntensity(state) {
    sceneStore.hdriIntensity = state;
  },
  setHdriXRotation(state) {
    sceneStore.hdriXRotation = state;
  },
  setHdriYRotation(state) {
    sceneStore.hdriYRotation = state;
  },
  setHdriZRotation(state) {
    sceneStore.hdriZRotation = state;
  },

  // 주변광
  ambientLightToggle: true,
  ambientLightIntensity: 0.3,
  ambientLightColor: { h: 0, s: 0, v: 100, a: 1 },

  setAmbientLightToggle(state) {
    sceneStore.ambientLightToggle = state;
  },
  setAmbientLightIntensity(state) {
    sceneStore.ambientLightIntensity = state;
  },
  setAmbientLightColor(state) {
    sceneStore.ambientLightColor = state;
  },

  // 직사광
  directionalLightToggle: true,
  directionalLightIntensity: 2.5,
  directionalLightColor: { h: 0, s: 0, v: 100, a: 1 },

  setDirectionalLightToggle(state) {
    sceneStore.directionalLightToggle = state;
  },
  setDirectionalLightIntensity(state) {
    sceneStore.directionalLightIntensity = state;
  },
  setDirectionalLightColor(state) {
    sceneStore.directionalLightColor = state;
  },

  // 씬(Scene) 설정 - 디스플레이
  // 배경컬러
  canvasBackgroundColorToggle: false,
  canvasBackgroundColor: { h: 0, s: 0, v: 20, a: 1 },

  setCanvasBackgroundColorToggle(state) {
    sceneStore.canvasBackgroundColorToggle = state;
  },
  setCanvasBackgroundColor(state) {
    sceneStore.canvasBackgroundColor = state;
  },

  // 그리드
  // 사각형그리드
  isGridVisible: true,
  // 중심선그리드
  isAxisVisible: true,

  setIsGridVisible(state) {
    sceneStore.isGridVisible = state;
  },
  setIsAxisVisible(state) {
    sceneStore.isAxisVisible = state;
  },

  // 씬(Scene) 설정 - 포스트 효과
  SSAOToggle: false,
  bloomToggle: false,

  setSSAOToggle(state) {
    sceneStore.SSAOToggle = state;
  },
  setBloomToggle(state) {
    sceneStore.bloomToggle = state;
  },

  templates: [
    "MX_hdr_indoor_3pointLightStudio_01",
    "MX_hdr_indoor_artistWorkroom_01",
    "MX_hdr_indoor_ballroom_01",
    "MX_hdr_outdoor_cityStreet_01",
    "MX_hdr_outdoor_clearedCloud_01",
    "MX_hdr_outdoor_dayLight_01",
    "MX_hdr_outdoor_forest_01",
    "MX_hdr_outdoor_night_01",
    "MX_hdr_outdoor_sunsetLight_01",
    "MX_hdr_outdoor_sunsetLight_02",
  ],

  get isOpen(): boolean {
    return sceneStore.type === "scene";
  },
  toggleVisibility: () => {
    if (sceneStore.type !== "scene") {
      sceneStore.setType("scene");
    } else {
      sceneStore.setType("none");
    }
  },
});

export default sceneStore;
