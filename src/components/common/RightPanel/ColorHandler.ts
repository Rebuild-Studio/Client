import * as THREE from "three";
import { HsvaColor, RgbColor, hsvaToHex, rgbaToHsva } from "@uiw/color-convert";
import primitiveStore from "@/store/primitiveStore";

export const updateMaterialColor = (phsva: HsvaColor) => {
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
