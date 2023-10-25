import { observable } from "mobx";

type SceneType = "scene" | "none";
type BackgroundImageType =
  | "MX_hdr_indoor_3pointLightStudio_01"
  | "MX_hdr_indoor_artistWorkroom_01"
  | "MX_hdr_indoor_ballroom_01"
  | "MX_hdr_outdoor_cityStreet_01"
  | "MX_hdr_outdoor_clearedCloud_01"
  | "MX_hdr_outdoor_dayLight_01"
  | "MX_hdr_outdoor_forest_01"
  | "MX_hdr_outdoor_night_01"
  | "MX_hdr_outdoor_sunsetLight_01"
  | "MX_hdr_outdoor_sunsetLight_02"
  | "none";

interface SceneSettingColor {
  h: number;
  s: number;
  v: number;
  a: number;
}

interface SceneSettingStoreProps {
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

  backgroundImages: [
    "MX_hdr_indoor_3pointLightStudio_01",
    "MX_hdr_indoor_artistWorkroom_01",
    "MX_hdr_indoor_ballroom_01",
    "MX_hdr_outdoor_cityStreet_01",
    "MX_hdr_outdoor_clearedCloud_01",
    "MX_hdr_outdoor_dayLight_01",
    "MX_hdr_outdoor_forest_01",
    "MX_hdr_outdoor_night_01",
    "MX_hdr_outdoor_sunsetLight_01",
    "MX_hdr_outdoor_sunsetLight_02"
  ];
  selectedBackgroundImage: BackgroundImageType;

  setBackgroundImage: (state: BackgroundImageType) => void;

  isOpen: boolean;
  toggleVisibility: () => void;
}

const sceneSettingStore = observable<SceneSettingStoreProps>({
  type: "none",

  setType(type) {
    sceneSettingStore.type = type;
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
    sceneSettingStore.hdriToggle = state;
  },
  setHdriBackgroundVisibleToggle(state) {
    sceneSettingStore.hdriBackgroundVisibleToggle = state;
  },
  setHdriIntensity(state) {
    sceneSettingStore.hdriIntensity = state;
  },
  setHdriXRotation(state) {
    sceneSettingStore.hdriXRotation = state;
  },
  setHdriYRotation(state) {
    sceneSettingStore.hdriYRotation = state;
  },
  setHdriZRotation(state) {
    sceneSettingStore.hdriZRotation = state;
  },

  // 주변광
  ambientLightToggle: true,
  ambientLightIntensity: 0.3,
  ambientLightColor: { h: 0, s: 0, v: 100, a: 1 },

  setAmbientLightToggle(state) {
    sceneSettingStore.ambientLightToggle = state;
  },
  setAmbientLightIntensity(state) {
    sceneSettingStore.ambientLightIntensity = state;
  },
  setAmbientLightColor(state) {
    sceneSettingStore.ambientLightColor = state;
  },

  // 직사광
  directionalLightToggle: true,
  directionalLightIntensity: 2.5,
  directionalLightColor: { h: 0, s: 0, v: 100, a: 1 },

  setDirectionalLightToggle(state) {
    sceneSettingStore.directionalLightToggle = state;
  },
  setDirectionalLightIntensity(state) {
    sceneSettingStore.directionalLightIntensity = state;
  },
  setDirectionalLightColor(state) {
    sceneSettingStore.directionalLightColor = state;
  },

  // 씬(Scene) 설정 - 디스플레이
  // 배경컬러
  canvasBackgroundColorToggle: false,
  canvasBackgroundColor: { h: 0, s: 0, v: 20, a: 1 },

  setCanvasBackgroundColorToggle(state) {
    sceneSettingStore.canvasBackgroundColorToggle = state;
  },
  setCanvasBackgroundColor(state) {
    sceneSettingStore.canvasBackgroundColor = state;
  },

  // 그리드
  // 사각형그리드
  isGridVisible: true,
  // 중심선그리드
  isAxisVisible: true,

  setIsGridVisible(state) {
    sceneSettingStore.isGridVisible = state;
  },
  setIsAxisVisible(state) {
    sceneSettingStore.isAxisVisible = state;
  },

  // 씬(Scene) 설정 - 포스트 효과
  SSAOToggle: false,
  bloomToggle: false,

  setSSAOToggle(state) {
    sceneSettingStore.SSAOToggle = state;
  },
  setBloomToggle(state) {
    sceneSettingStore.bloomToggle = state;
  },

  backgroundImages: [
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
  selectedBackgroundImage: "MX_hdr_indoor_3pointLightStudio_01",

  setBackgroundImage(state) {
    sceneSettingStore.selectedBackgroundImage = state;
  },

  get isOpen(): boolean {
    return sceneSettingStore.type === "scene";
  },
  toggleVisibility: () => {
    if (sceneSettingStore.type !== "scene") {
      sceneSettingStore.setType("scene");
    } else {
      sceneSettingStore.setType("none");
    }
  },
});

export type { SceneSettingStoreProps };
export default sceneSettingStore;
