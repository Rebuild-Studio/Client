import * as THREE from 'three';
import { observer } from 'mobx-react';
import { MxCanvasCore } from '@mv/core';
import storeContainer from '@/store/storeContainer';
import createMxJson from '@/utils/json/createMxJson';
import legacyStoreContainer from '../interaction(legacyJS)/src/Components/stores/storeContainer';

const Preview = observer(() => {
  const { projectStore } = storeContainer;
  const { eventSystem_store } = legacyStoreContainer;
  const sceneForPreview = projectStore.scene;

  if (!sceneForPreview) {
    return null;
  }

  const cameraMesh = sceneForPreview.getObjectByName('PREVIEW_CAMERA');
  if (cameraMesh) {
    restoreCameraTransformation(cameraMesh);
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

const restoreCameraTransformation = (cameraMesh: THREE.Object3D) => {
  const camera = cameraMesh.children.find(
    (child) => child instanceof THREE.Camera
  ) as THREE.Camera;

  cameraMesh.getWorldPosition(camera.position);
  cameraMesh.getWorldQuaternion(camera.quaternion);
  camera.updateMatrix();
};
