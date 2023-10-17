import { observable } from "mobx";

type GizmoType = "TRANSFORM" | "ROTATE" | "SCALE" | "NONE";

interface TransformControlProps {
  currentControl: GizmoType;
  isTranslated: boolean;
  isRotated: boolean;
  isScaled: boolean;
  setIsTranslated: () => void;
  setIsRotated: () => void;
  setIsScaled: () => void;
  clearTransform: () => void;
}

const transformControlStore = observable<TransformControlProps>({
  currentControl: "NONE",
  isTranslated: true,
  isRotated: true,
  isScaled: true,
  setIsTranslated() {
    this.currentControl = "TRANSFORM";
    this.isTranslated = true;
    this.isRotated = false;
    this.isScaled = false;
  },
  setIsRotated() {
    this.currentControl = "ROTATE";
    this.isTranslated = false;
    this.isRotated = true;
    this.isScaled = false;
  },
  setIsScaled() {
    this.currentControl = "SCALE";
    this.isTranslated = false;
    this.isRotated = false;
    this.isScaled = true;
  },
  clearTransform() {
    this.currentControl = "NONE";
    this.isTranslated = true;
    this.isRotated = true;
    this.isScaled = true;
  }
});

export default transformControlStore;
