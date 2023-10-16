import { observable } from "mobx";

const controllerBar_store = observable({
  gizmoStatus: "world",
  magneticMode: false,
  setMagneticMode(mode) {
    this.magneticMode = mode;
  },

  normalMode: false,
  setNormalMode(mode) {
    this.normalMode = mode;
  },

  attachMode: false,
  setAttachMode(mode) {
    this.attachMode = mode;
  },

  rotationSnapMode: false,
  setRotationSnapMode(mode) {
    this.rotationSnapMode = mode;
  },

})

export { controllerBar_store };