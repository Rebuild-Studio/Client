import * as THREE from "three";
import { HsvaColor, RgbColor, hsvaToHex, rgbaToHsva } from "@uiw/color-convert";
import storeContainer from "@/store/storeContainer";

export const updateAmbientLightColor = (phsva: HsvaColor) => {
  const { sceneStore } = storeContainer;

  sceneStore.ambientLightColor = phsva;
};

export const updateAmbientLightAlpha = (alpha: number) => {
  const { sceneStore } = storeContainer;

  sceneStore.ambientLightColor.a = alpha;
};

export const updateDirectionalLightColor = (phsva: HsvaColor) => {
  const { sceneStore } = storeContainer;

  sceneStore.directionalLightColor = phsva;
};

export const updateDirectionalLightAlpha = (alpha: number) => {
  const { sceneStore } = storeContainer;

  sceneStore.directionalLightColor.a = alpha;
};

export const updateCanvasBackgroundColor = (phsva: HsvaColor) => {
  const { sceneStore } = storeContainer;

  sceneStore.canvasBackgroundColor = phsva;
};

export const updateCanvasBackgroundAlpha = (alpha: number) => {
  const { sceneStore } = storeContainer;

  sceneStore.canvasBackgroundColor.a = alpha;
};

export const updateMaterialColor = (phsva: HsvaColor) => {
  const { primitiveStore } = storeContainer;
  const selectedPrimitive = Object.values(primitiveStore.selectedPrimitives)[0];
  const selectedMaterial = selectedPrimitive.material;
  const hexColor = hsvaToHex(phsva);

  if (selectedMaterial instanceof THREE.MeshStandardMaterial) {
    selectedMaterial.color.set(hexColor);
    selectedMaterial.opacity = phsva.a;
    selectedPrimitive.material = selectedMaterial;
  }
};

export const updateMaterialAlpha = (alpha: number) => {
  const { primitiveStore } = storeContainer;
  const selectedPrimitive = Object.values(primitiveStore.selectedPrimitives)[0];
  const selectedMaterial = selectedPrimitive.material;

  if (selectedMaterial instanceof THREE.MeshStandardMaterial) {
    selectedMaterial.transparent = true;
    selectedMaterial.opacity = alpha;
    selectedPrimitive.material = selectedMaterial;
  }
};

export const rgbToHsva = (rgb: RgbColor, opacity: number) => {
  const rgba = { r: rgb.r * 255, g: rgb.g * 255, b: rgb.b * 255, a: opacity };
  const hsva = rgbaToHsva(rgba);
  return hsva;
};
