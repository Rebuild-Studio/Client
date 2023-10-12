import * as THREE from "three";
import { HsvaColor, RgbColor, hsvaToHex, rgbaToHsva } from "@uiw/color-convert";
import storeContainer from "@/store/storeContainer";

const colorHandler = {
  updateAmbientLightColor: (phsva: HsvaColor) => {
    const { sceneSettingStore } = storeContainer;

    sceneSettingStore.ambientLightColor = phsva;
  },

  updateAmbientLightAlpha: (alpha: number) => {
    const { sceneSettingStore } = storeContainer;
    sceneSettingStore.ambientLightColor.a = alpha;
  },

  updateDirectionalLightColor: (phsva: HsvaColor) => {
    const { sceneSettingStore } = storeContainer;
    sceneSettingStore.directionalLightColor = phsva;
  },

  updateDirectionalLightAlpha: (alpha: number) => {
    const { sceneSettingStore } = storeContainer;
    sceneSettingStore.directionalLightColor.a = alpha;
  },

  updateCanvasBackgroundColor: (phsva: HsvaColor) => {
    const { sceneSettingStore } = storeContainer;
    sceneSettingStore.canvasBackgroundColor = phsva;
  },

  updateCanvasBackgroundAlpha: (alpha: number) => {
    const { sceneSettingStore } = storeContainer;
    sceneSettingStore.canvasBackgroundColor.a = alpha;
  },

  updateMaterialColor: (phsva: HsvaColor) => {
    const { primitiveStore } = storeContainer;
    const selectedPrimitive = Object.values(
      primitiveStore.selectedPrimitives
    )[0];
    const selectedMaterial = selectedPrimitive.material;
    const hexColor = hsvaToHex(phsva);

    if (selectedMaterial instanceof THREE.MeshStandardMaterial) {
      selectedMaterial.color.set(hexColor);
      selectedMaterial.opacity = phsva.a;
      selectedPrimitive.material = selectedMaterial;
    }
  },

  updateMaterialAlpha: (alpha: number) => {
    const { primitiveStore } = storeContainer;
    const selectedPrimitive = Object.values(
      primitiveStore.selectedPrimitives
    )[0];
    const selectedMaterial = selectedPrimitive.material;

    if (selectedMaterial instanceof THREE.MeshStandardMaterial) {
      selectedMaterial.transparent = true;
      selectedMaterial.opacity = alpha;
      selectedPrimitive.material = selectedMaterial;
    }
  },

  rgbToHsva: (rgb: RgbColor, opacity: number) => {
    const rgba = { r: rgb.r * 255, g: rgb.g * 255, b: rgb.b * 255, a: opacity };
    const hsva = rgbaToHsva(rgba);
    return hsva;
  },
};

export default colorHandler;
