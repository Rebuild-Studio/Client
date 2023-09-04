import * as THREE from "three";

const getDefaultMaterialSetting = () => {
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xbbbbbb,
  });
  material.metalness = 0;
  material.roughness = 0.5;
  material.ior = 1.45;

  return material;
};

export { getDefaultMaterialSetting };
