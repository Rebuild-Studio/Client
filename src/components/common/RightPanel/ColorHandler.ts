import * as THREE from "three";
import { HsvaColor, hsvaToHex, rgbaToHsva } from "@uiw/color-convert";
import { action } from "mobx";
import primitiveStore from "@/store/primitiveStore";

export function updateMaterialColor(phsva: HsvaColor) {
  const keys = Object.keys(primitiveStore.selectedPrimitives);
  const selectedMaterial = primitiveStore.selectedPrimitives[keys[0]]?.material;

  const hexColor = hsvaToHex(phsva);
  if (selectedMaterial instanceof THREE.MeshStandardMaterial) {
    selectedMaterial.color.set(hexColor);
    selectedMaterial.opacity = phsva.a;
    primitiveStore.selectedPrimitives[keys[0]].material = selectedMaterial;
    primitiveStore.updateSelectedPrimitives(
      keys[0],
      primitiveStore.selectedPrimitives[keys[0]]
    );
  }
}

export function updateMaterialAlpha(alpha: number) {
  const keys = Object.keys(primitiveStore.selectedPrimitives);
  const selectedMaterial = primitiveStore.selectedPrimitives[keys[0]]?.material;
  if (selectedMaterial instanceof THREE.MeshStandardMaterial) {
    selectedMaterial.transparent = true;
    selectedMaterial.opacity = alpha;

    primitiveStore.selectedPrimitives[keys[0]].material = selectedMaterial;
    const newMesh = primitiveStore.selectedPrimitives[keys[0]];
    newMesh.material = selectedMaterial;
    primitiveStore.updateSelectedPrimitives(keys[0], newMesh);
  }
}

export const rgbToHsva = action((rgb: any, opacity: number) => {
  const rgba = { r: rgb.r * 255, g: rgb.g * 255, b: rgb.b * 255, a: opacity };
  const hsva = rgbaToHsva(rgba);
  return hsva;
});
