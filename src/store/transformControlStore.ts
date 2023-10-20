import { observable } from "mobx";

type GizmoType = "TRANSFORM" | "ROTATE" | "SCALE" | "NONE";

interface TransformControlProps {
  currentControl: GizmoType;
  isTranslated: boolean;
  isRotated: boolean;
  isScaled: boolean;
  isFocused: boolean;
  setIsTranslated: () => void;
  setIsRotated: () => void;
  setIsScaled: () => void;
  setIsFocused: (isFocused: boolean) => void;
  clearTransform: () => void;
  clearFocused: () => void;
}

const transformControlStore = observable<TransformControlProps>({
  currentControl: "NONE",
  isTranslated: true,
  isRotated: true,
  isScaled: true,
  isFocused: false,
  setIsTranslated() {
    this.currentControl = "TRANSFORM";
    this.isTranslated = true;
    this.isRotated = false;
    this.isScaled = false;
    this.isFocused = true;
  },
  setIsRotated() {
    this.currentControl = "ROTATE";
    this.isTranslated = false;
    this.isRotated = true;
    this.isScaled = false;
    this.isFocused = true;
  },
  setIsScaled() {
    this.currentControl = "SCALE";
    this.isTranslated = false;
    this.isRotated = false;
    this.isScaled = true;
    this.isFocused = true;
  },
  setIsFocused(isFocused: boolean) {
    this.isFocused = isFocused;
  },
  clearTransform() {
    this.currentControl = "NONE";
    this.isTranslated = true;
    this.isRotated = true;
    this.isScaled = true;
  },
  clearFocused() {
    this.isFocused = false;
  },
});

export type { GizmoType, TransformControlProps };
export default transformControlStore;
