import * as THREE from 'three';

const getDefaultMaterialSetting = () => {
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xbbbbbb,
    metalness: 0,
    roughness: 0.5,
    ior: 1.45
  });

  return material;
};

export { getDefaultMaterialSetting };
