import * as THREE from 'three';

export const restoreCameraTransformation = (scene: THREE.Scene) => {
  const cameraMesh = scene.getObjectByName('PREVIEW_CAMERA');
  if (!cameraMesh) return;

  const camera = cameraMesh.children.find(
    (child) => child instanceof THREE.Camera
  ) as THREE.Camera;

  cameraMesh.getWorldPosition(camera.position);
  cameraMesh.getWorldQuaternion(camera.quaternion);
  camera.updateMatrix();
};
