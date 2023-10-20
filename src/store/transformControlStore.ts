import { observable } from "mobx";

type GizmoType = "TRANSFORM" | "ROTATE" | "SCALE" | "NONE";

interface TransformControlProps {
  currentControl: GizmoType;
  isTranslated: boolean;
  isRotated: boolean;
  isScaled: boolean;
  isActivated: boolean;
  setIsTranslated: () => void;
  setIsRotated: () => void;
  setIsScaled: () => void;
  setIsActivated: (isActivated: boolean) => void;
  clearTransform: () => void;
  clearActivated: () => void;
}

const transformControlStore = observable<TransformControlProps>({
  currentControl: "NONE",
  isTranslated: true,
  isRotated: true,
  isScaled: true,
  isActivated: false,
  setIsTranslated() {
    this.currentControl = "TRANSFORM";
    this.isTranslated = true;
    this.isRotated = false;
    this.isScaled = false;
    this.isActivated = true;
  },
  setIsRotated() {
    this.currentControl = "ROTATE";
    this.isTranslated = false;
    this.isRotated = true;
    this.isScaled = false;
    this.isActivated = true;
  },
  setIsScaled() {
    this.currentControl = "SCALE";
    this.isTranslated = false;
    this.isRotated = false;
    this.isScaled = true;
    this.isActivated = true;
  },
  setIsActivated(isActivated: boolean) {
    this.isActivated = isActivated;
  },
  clearTransform() {
    this.currentControl = "NONE";
    this.isTranslated = true;
    this.isRotated = true;
    this.isScaled = true;
  },
  clearActivated() {
    this.isActivated = false;
  },
});

export type { GizmoType, TransformControlProps };
export default transformControlStore;
