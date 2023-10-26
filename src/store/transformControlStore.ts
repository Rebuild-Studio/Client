import { makeAutoObservable } from "mobx";

type GizmoType = "TRANSFORM" | "ROTATE" | "SCALE" | "NONE";

class TransformControlStore {
  currentControl: GizmoType = "NONE";
  isTranslated = true;
  isRotated = true;
  isScaled = true;
  isFocused = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setIsTranslated() {
    this.currentControl = "TRANSFORM";
    this.isTranslated = true;
    this.isRotated = false;
    this.isScaled = false;
    this.isFocused = true;
  }
  setIsRotated() {
    this.currentControl = "ROTATE";
    this.isTranslated = false;
    this.isRotated = true;
    this.isScaled = false;
    this.isFocused = true;
  }
  setIsScaled() {
    this.currentControl = "SCALE";
    this.isTranslated = false;
    this.isRotated = false;
    this.isScaled = true;
    this.isFocused = true;
  }
  setIsFocused(isFocused: boolean) {
    this.isFocused = isFocused;
  }
  clearTransform() {
    this.currentControl = "NONE";
    this.isTranslated = true;
    this.isRotated = true;
    this.isScaled = true;
  }
  clearFocused() {
    this.isFocused = false;
  }
}
const transformControlStore = new TransformControlStore();
export default transformControlStore;
