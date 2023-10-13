// noinspection JSUnusedGlobalSymbols
import { observable } from "mobx";
import * as THREE from "three";

const common_store = observable({
  openPmxSaveMenu: false,
  openSaveMenu: false,
  fabToggle: "report",
  lastClick: 0,
  nClick: 0,
  isTransControl: false,
  plane: null,
  domEvents: null,
  orbitcontrol: null,
  previewCameraObject: null,
  cameraPreviewOn: false,
  curMode: "translate",
  topSlide: true,
  curCategory: "canvas",
  curAsset: "",
  optionLeftTab: "",
  isCtrl: false,
  onMouseUpPosition: null,
  onMouseDownPosition: null,
  onMouseDownTime: 0,
  controlercheck: null,
  transcontrol: null,
  sceneHelpers: null,
  onPlane: false,
  raycastObjects: [],
  boundingCylinder: null,
  isMoveMode: false,
  isMoveModeEnd: false,
  isPreview: false,
  isSceneSetting: false,
  outlineObjects: [],
  lightMeshVisible: true,
  asset: {},
  isLoading: false,
  uploadedImg: null,
  openedControlBarTooltipId: null,
  hsva_h: 0,
  loginStatus: true,
  orientationHelper: null,
  originMode: false,

  setOriginMode() {
    this.originMode = !this.originMode;
  },
  lattice: null,

  setIsTransControl(mode) {
    this.isTransControl = mode;
  },
  changeMode_nonTrans(mode) {
    this.transcontrol.detach();
    this.curMode = mode;
  },
  changeTopSlide() {
    this.topSlide = !this.topSlide;
  },
  changeCategory(category) {
    this.curCategory = category;
    if (!this.topSlide) this.changeTopSlide();
  },
  changeAsset(asset) {
    this.curAsset = asset;
  },
  changeLeftOption(option) {
    this.optionLeftTab = option;
  },
  setTranscontrol(scene, trans) {
    this.transcontrol = trans;
    if (scene != null) {
      scene.add(this.transcontrol);
    }
  },
  setIsCtrl(ctrl) {
    this.isCtrl = ctrl;
  },
  setOnMouseUpPosition(position) {
    this.onMouseUpPosition = position;
  },
  setOnMouseDownPosition(position) {
    this.onMouseDownPosition = position;
  },
  setOnMouseDownTime(time) {
    this.onMouseDownTime = time;
  },
  setControlercheck(controlercheck) {
    this.controlercheck = controlercheck;
  },
  setOrbitcontrol(orbitcontrol) {
    this.orbitcontrol = orbitcontrol;
  },
  setDomEvents(domEvents) {
    this.domEvents = domEvents;
  },
  setPreviewCameraObject(object) {
    this.previewCameraObject = object;
  },
  SetCameraPreviewOn(mode) {
    this.cameraPreviewOn = mode;
  },
  createFloor() {
    const geometry = new THREE.PlaneGeometry(500, 500);
    const material = new THREE.MeshPhongMaterial();
    material.envMapIntensity = 0.0;
    const floor = new THREE.Mesh(geometry, material);
    floor.receiveShadow = true;
    floor.rotation.set(-Math.PI / 2, 0, 0);
    floor.name = "floor";
    floor.visible = false;
    this.floor = floor;
  },
  setPlane(plane) {
    this.plane = plane;
  },
  setOnPlane(object, state) {
    if (object.name === "plane") this.onPlane = state;
  },
  addRaycastObject(object) {
    this.raycastObjects.push(object);
  },
  deleteRaycastObject(object) {
    var index = this.raycastObjects.indexOf(object);
    if (index > -1) {
      this.raycastObjects.splice(index, 1);
    }
  },
  setIsMoveMode(mode) {
    this.isMoveMode = mode;
  },
  setIsMoveModeEnd(mode) {
    this.isMoveModeEnd = mode;
  },
  setorientationHelper(orientationHelper) {
    this.orientationHelper = orientationHelper;
  },
  setIsPreview(bool) {
    this.isPreview = bool;
  },
  setIsSceneSetting(bool) {
    this.isSceneSetting = bool;
  },
  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  },
  setUploadedImg(img) {
    this.uploadedImg = img;
  },
  setHsva_h(_hsva_h) {
    this.hsva_h = _hsva_h;
  },
  setLattice(lattice) {
    this.lattice = lattice;
  },
});

export { common_store };
