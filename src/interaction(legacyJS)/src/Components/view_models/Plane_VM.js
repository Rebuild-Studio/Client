import * as THREE from "three";

export default function Plane_VM() {
  const createPlane = () => {
    const geo = new THREE.PlaneGeometry(1000, 1000);
    const plane = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({ visible: false })
    );
    plane.rotation.set(-Math.PI / 2, 0, 0);
    // plane.position.set(0, -3, 0);
    plane.name = "plane";
    return plane;
  };

  return {
    createPlane,
  };
}
