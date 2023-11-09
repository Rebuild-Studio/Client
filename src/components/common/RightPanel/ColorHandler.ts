import * as THREE from 'three';
import { HsvaColor, RgbColor, hsvaToHex, rgbaToHsva } from '@uiw/color-convert';
import storeContainer from '@/store/storeContainer';

class ColorHandler {
  static updateAmbientLightColor(phsva: HsvaColor) {
    const { sceneSettingStore } = storeContainer;

    sceneSettingStore.ambientLightColor = phsva;
  }

  static updateAmbientLightAlpha(alpha: number) {
    const { sceneSettingStore } = storeContainer;
    sceneSettingStore.ambientLightColor.a = alpha;
  }

  static updateDirectionalLightColor(phsva: HsvaColor) {
    const { sceneSettingStore } = storeContainer;
    sceneSettingStore.directionalLightColor = phsva;
  }

  static updateDirectionalLightAlpha(alpha: number) {
    const { sceneSettingStore } = storeContainer;
    sceneSettingStore.directionalLightColor.a = alpha;
  }

  static updateCanvasBackgroundColor(phsva: HsvaColor) {
    const { sceneSettingStore } = storeContainer;
    sceneSettingStore.canvasBackgroundColor = phsva;
  }

  static updateCanvasBackgroundAlpha(alpha: number) {
    const { sceneSettingStore } = storeContainer;
    sceneSettingStore.canvasBackgroundColor.a = alpha;
  }

  static updateMaterialColor(phsva: HsvaColor) {
    const { primitiveStore } = storeContainer;
    const selectedPrimitive = Object.values(
      primitiveStore.selectedPrimitives
    )[0];
    let selectedMaterial;
    if (selectedPrimitive instanceof THREE.Group) {
      selectedPrimitive.traverse((child) => {
        selectedMaterial = (child as THREE.Mesh).material;
      });
    } else if (selectedPrimitive instanceof THREE.Mesh) {
      selectedMaterial = selectedPrimitive.material;
    }
    const hexColor = hsvaToHex(phsva);

    if (selectedMaterial instanceof THREE.MeshStandardMaterial) {
      selectedMaterial.color.set(hexColor);
      selectedMaterial.opacity = phsva.a;
      selectedPrimitive.material = selectedMaterial;
    }
  }

  static updateMaterialAlpha(alpha: number) {
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
  }

  static rgbToHsva(rgb: RgbColor, opacity: number) {
    const rgba = {
      r: rgb.r * 255,
      g: rgb.g * 255,
      b: rgb.b * 255,
      a: opacity
    };
    const hsva = rgbaToHsva(rgba);
    return hsva;
  }
}

export default ColorHandler;
