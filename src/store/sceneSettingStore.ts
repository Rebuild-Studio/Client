import { observable } from "mobx";

type SceneType = "scene" | "none";

interface Scene {
  type: SceneType;
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
  ambientLightColor: { h: number; s: number; v: number; a: number };

  setAmbientLightToggle: (state: boolean) => void;
  setAmbientLightIntensity: (state: number) => void;
  setAmbientLightColor: (state: {
    h: number;
    s: number;
    v: number;
    a: number;
  }) => void;

  directionalLightToggle: boolean;
  directionalLightIntensity: number;
  directionalLightColor: { h: number; s: number; v: number; a: number };

  setDirectionalLightToggle: (state: boolean) => void;
  setDirectionalLightIntensity: (state: number) => void;
  setDirectionalLightColor: (state: {
    h: number;
    s: number;
    v: number;
    a: number;
  }) => void;

  canvasBackgroundColorToggle: boolean;
  canvasBackgroundColor: { h: number; s: number; v: number; a: number };

  setCanvasBackgroundColorToggle: (state: boolean) => void;
  setCanvasBackgroundColor: (state: {
    h: number;
    s: number;
    v: number;
    a: number;
  }) => void;

  isGridVisible: boolean;
  isAxisVisible: boolean;

  setIsGridVisible: (state: boolean) => void;
  setIsAxisVisible: (state: boolean) => void;

  SSAOToggle: boolean;
  bloomToggle: boolean;

  setSSAOToggle: (state: boolean) => void;
  setBloomToggle: (state: boolean) => void;

  templates: string[];
}

const sceneStore = observable<Scene>({
  type: "none",

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
});

export default sceneStore;
