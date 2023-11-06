import * as THREE from 'three';
import { observer } from 'mobx-react';
import { MxCanvasCore } from '@mv/core';
import storeContainer from '@/store/storeContainer';
import createMxJson from '@/utils/json/createMxJson';
import legacyStoreContainer from '../interaction(legacyJS)/src/Components/stores/storeContainer';

const Preview = observer(() => {
  const { projectStore } = storeContainer;
  const { eventSystem_store } = legacyStoreContainer;
  const sceneForPreview = projectStore.scene?.clone(true);

  if (!sceneForPreview) {
    return null;
  }

  const cameraMesh = sceneForPreview.getObjectByName('PREVIEW_CAMERA');
  if (cameraMesh) {
    const camera = getCameraFromMesh(cameraMesh);
    sceneForPreview.add(camera);
    sceneForPreview.remove(cameraMesh);
  }

  const sceneJson = sceneForPreview.toJSON();
  const interactionJson = JSON.parse(
    JSON.stringify(eventSystem_store.toJSON())
  );
  const previewJson = createMxJson(sceneJson, interactionJson);
  const data = JSON.stringify(previewJson);

  return <MxCanvasCore data={data} mode={'play'} />;
});

export default Preview;

const getCameraFromMesh = (cameraMesh: THREE.Object3D) => {
  const camera = cameraMesh.children.find(
    (child) => child instanceof THREE.Camera
  ) as THREE.Camera;

  const newCamera = camera.clone();
  cameraMesh.getWorldPosition(newCamera.position);
  cameraMesh.getWorldQuaternion(newCamera.quaternion);
  newCamera.updateMatrix();

  return newCamera;
};
