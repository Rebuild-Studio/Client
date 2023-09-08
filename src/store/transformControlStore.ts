import { observable } from "mobx";

type GizmoType = "TRANSFORM" | "ROTATE" | "SCALE" | "NONE";

interface TransformControlProps {
  currentControl: GizmoType;
  isTranslating: boolean;
  isRotating: boolean;
  isScaling: boolean;
  setIsTranslating: () => void;
  setIsRotating: () => void;
  setIsScaling: () => void;
  clearTransform: () => void;
}

const transformControlStore = observable<TransformControlProps>({
  currentControl: "NONE",
  isTranslating: true,
  isRotating: true,
  isScaling: true,
  setIsTranslating() {
    this.currentControl = "TRANSFORM";
    this.isTranslating = true;
    this.isRotating = false;
    this.isScaling = false;
  },
  setIsRotating() {
    this.currentControl = "ROTATE";
    this.isTranslating = false;
    this.isRotating = true;
    this.isScaling = false;
  },
  setIsScaling() {
    this.currentControl = "SCALE";
    this.isTranslating = false;
    this.isRotating = false;
    this.isScaling = true;
  },
  clearTransform() {
    this.currentControl = "NONE";
    this.isTranslating = true;
    this.isRotating = true;
    this.isScaling = true;
  },
});

export default transformControlStore;
