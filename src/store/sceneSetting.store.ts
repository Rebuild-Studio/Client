import { makeAutoObservable } from 'mobx';
import { HsvaColor } from '@uiw/color-convert';

type SceneType = 'scene' | 'none';
type BackgroundImageType =
  | 'MX_hdr_indoor_3pointLightStudio_01'
  | 'MX_hdr_indoor_artistWorkroom_01'
  | 'MX_hdr_indoor_ballroom_01'
  | 'MX_hdr_outdoor_cityStreet_01'
  | 'MX_hdr_outdoor_clearedCloud_01'
  | 'MX_hdr_outdoor_dayLight_01'
  | 'MX_hdr_outdoor_forest_01'
  | 'MX_hdr_outdoor_night_01'
  | 'MX_hdr_outdoor_sunsetLight_01'
  | 'MX_hdr_outdoor_sunsetLight_02'
  | 'none';

class SceneSettingStore {
  type = 'none';
  // 씬(Scene) 설정 - 환경광
  // 환경이미지
  hdriToggle = true;
  hdriBackgroundVisibleToggle = false;
  hdriIntensity = 1;
  hdriXRotation = 0;
  hdriYRotation = 0;
  hdriZRotation = 0;

  // 주변광
  ambientLightToggle = true;
  ambientLightIntensity = 0.3;
  ambientLightColor = { h: 0, s: 0, v: 100, a: 1 };

  // 직사광
  directionalLightToggle = true;
  directionalLightIntensity = 2.5;
  directionalLightColor = { h: 0, s: 0, v: 100, a: 1 };

  // 씬(Scene) 설정 - 디스플레이
  // 배경컬러
  canvasBackgroundColorToggle = false;
  canvasBackgroundColor = { h: 0, s: 0, v: 20, a: 1 };

  // 그리드
  isGridVisible = true; // 사각형그리드
  isAxisVisible = true; // 중심선그리드

  // 씬(Scene) 설정 - 포스트 효과
  SSAOToggle = false;
  bloomToggle = false;

  backgroundImages = [
    'MX_hdr_indoor_3pointLightStudio_01',
    'MX_hdr_indoor_artistWorkroom_01',
    'MX_hdr_indoor_ballroom_01',
    'MX_hdr_outdoor_cityStreet_01',
    'MX_hdr_outdoor_clearedCloud_01',
    'MX_hdr_outdoor_dayLight_01',
    'MX_hdr_outdoor_forest_01',
    'MX_hdr_outdoor_night_01',
    'MX_hdr_outdoor_sunsetLight_01',
    'MX_hdr_outdoor_sunsetLight_02'
  ];
  selectedBackgroundImage = 'MX_hdr_indoor_3pointLightStudio_01';

  //constructor
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setType(type: SceneType) {
    this.type = type;
  }

  setHdriToggle(state: boolean) {
    this.hdriToggle = state;
  }
  setHdriBackgroundVisibleToggle(state: boolean) {
    this.hdriBackgroundVisibleToggle = state;
  }
  setHdriIntensity(state: number) {
    this.hdriIntensity = state;
  }
  setHdriXRotation(state: number) {
    this.hdriXRotation = state;
  }
  setHdriYRotation(state: number) {
    this.hdriYRotation = state;
  }
  setHdriZRotation(state: number) {
    this.hdriZRotation = state;
  }
  setAmbientLightToggle(state: boolean) {
    this.ambientLightToggle = state;
  }
  setAmbientLightIntensity(state: number) {
    this.ambientLightIntensity = state;
  }
  setAmbientLightColor(state: HsvaColor) {
    this.ambientLightColor = state;
  }

  setDirectionalLightToggle(state: boolean) {
    this.directionalLightToggle = state;
  }
  setDirectionalLightIntensity(state: number) {
    this.directionalLightIntensity = state;
  }
  setDirectionalLightColor(state: HsvaColor) {
    this.directionalLightColor = state;
  }
  setCanvasBackgroundColorToggle(state: boolean) {
    this.canvasBackgroundColorToggle = state;
  }
  setCanvasBackgroundColor(state: HsvaColor) {
    this.canvasBackgroundColor = state;
  }

  setIsGridVisible(state: boolean) {
    this.isGridVisible = state;
  }
  setIsAxisVisible(state: boolean) {
    this.isAxisVisible = state;
  }
  setSSAOToggle(state: boolean) {
    this.SSAOToggle = state;
  }
  setBloomToggle(state: boolean) {
    this.bloomToggle = state;
  }

  setBackgroundImage(state: BackgroundImageType) {
    this.selectedBackgroundImage = state;
  }

  get isOpen(): boolean {
    return this.type === 'scene';
  }

  toggleVisibility() {
    if (this.type !== 'scene') {
      this.setType('scene');
    } else {
      this.setType('none');
    }
  }
}

const sceneSettingStore = new SceneSettingStore();
export default sceneSettingStore;
