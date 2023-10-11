import {observable} from "mobx";

const transformation_store = observable({
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  scaleX: 0,
  scaleY: 0,
  scaleZ: 0,

  setPositionX(x) {
    this.positionX = x;
  },
  setPositionY(y) {
    this.positionY = y;
  },
  setPositionZ(z) {
    this.positionZ = z;
  },
  setRotationX(x) {
    this.rotationX = x;
  },
  setRotationY(y) {
    this.rotationY = y;
  },
  setRotationZ(z) {
    this.rotationZ = z;
  },
  setScaleX(x) {
    this.scaleX = x;
  },
  setScaleY(y) {
    this.scaleY = y;
  },
  setScaleZ(z) {
    this.scaleZ = z;
  },

})

export { transformation_store };