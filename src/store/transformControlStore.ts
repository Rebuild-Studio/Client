import { observable } from "mobx";

type GizmoType = "TRANSFORM" | "ROTATE" | "SCALE" | "NONE";

interface TransformControlProps {
  currentControl: GizmoType;
  isTranslating: boolean;
  isRotating: boolean;
  isScailing: boolean;
  setIsTranslating: () => void;
  setIsRotating: () => void;
  setIsScailing: () => void;
  clearTransform: () => void;
}

const transformControlStore = observable<TransformControlProps>({
  currentControl: "NONE",
  isTranslating: true,
  isRotating: true,
  isScailing: true,
  setIsTranslating() {
    this.currentControl = "TRANSFORM";
    this.isTranslating = true;
    this.isRotating = false;
    this.isScailing = false;
  },
  setIsRotating() {
    this.currentControl = "ROTATE";
    this.isTranslating = false;
    this.isRotating = true;
    this.isScailing = false;
  },
  setIsScailing() {
    this.currentControl = "SCALE";
    this.isTranslating = false;
    this.isRotating = false;
    this.isScailing = true;
  },
  clearTransform() {
    this.currentControl = "NONE";
    this.isTranslating = true;
    this.isRotating = true;
    this.isScailing = true;
  },
});

export default transformControlStore;
