import { observable } from "mobx";

interface Scene {
  type: string;
  hdriToggle: boolean;
  hdriBackgroundToggle: boolean;
  hdriIntensity: number;
  hdriXRotation: number;
  hdriYRotation: number;
  hdriZRotation: number;

  ambientLigitToggle: boolean;
  ambientLigitIntensity: number;
  ambientLigitColor: { h: number; s: number; v: number; a: number };

  directionalLightToggle: boolean;
  directionalLightIntensity: number;
  directionalLightColor: { h: number; s: number; v: number; a: number };

  canvasBackgroundColorToggle: boolean;
  canvasBackgroundColor: { h: number; s: number; v: number; a: number };

  isGridVisible: boolean;
  isAxisVisible: boolean;

  SSAOToggle: boolean;
  bloomToggle: boolean;
}

const sceneStore = observable<Scene>({
  // 씬(Scene) 설정 - 환경광
  // 환경이미지
  hdriToggle: true,
  hdriBackgroundToggle: false,
  hdriIntensity: 1,
  hdriXRotation: 0,
  hdriYRotation: 0,
  hdriZRotation: 0,

  // 주변광
  ambientLigitToggle: true,
  ambientLigitIntensity: 0.3,
  ambientLigitColor: { h: 0, s: 0, v: 100, a: 1 },

  // 직사광
  directionalLightToggle: true,
  directionalLightIntensity: 2.5,
  directionalLightColor: { h: 0, s: 0, v: 100, a: 1 },

  // 씬(Scene) 설정 - 디스플레이
  // 배경컬러
  canvasBackgroundColorToggle: false,
  canvasBackgroundColor: { h: 0, s: 0, v: 20, a: 1 },

  // 그리드
  // 사각형그리드
  isGridVisible: true,
  // 중심선그리드
  isAxisVisible: true,

  // 씬(Scene) 설정 - 포스트 효과
  SSAOToggle: false,
  bloomToggle: false,
} as Scene);

export default sceneStore;
