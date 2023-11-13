import * as THREE from 'three';
import { nanoid } from 'nanoid';
import PreviewCamera from '@/three_components/camera/PreviewCamera.tsx';
import { closeFullScreenLoading } from '@/utils/loading/loadingHandler';
import { PrimitiveStore } from '@store/primitive.store.ts';
import AssetPrimitive from '../assets/AssetPrimitive';
import LocalAssetPrimitive from '../assets/LocalAssetPrimitive';
import Group from '../group/Group';
import SelectedGroup from '../group/SelectedGroup';
import PointLight from '../lights/PointLight';
import SpotLight from '../lights/SpotLight';
import CapsulePrimitive from '../primitives/CapsulePrimitive';
import ConePrimitive from '../primitives/ConePrimitive';
import CubePrimitive from '../primitives/CubePrimitive';
import CylinderPrimitive from '../primitives/CylinderPrimitive';
import SpherePrimitive from '../primitives/SpherePrimitive';
import TorusPrimitive from '../primitives/TorusPrimitive';

const renderPrimitive = (storeId: string, mesh: THREE.Mesh) => {
  switch (mesh.geometry.type) {
    case 'CapsuleGeometry': {
      return <CapsulePrimitive storeId={storeId} propMesh={mesh} />;
    }
    case 'ConeGeometry': {
      return <ConePrimitive storeId={storeId} propMesh={mesh} />;
    }
    case 'CylinderGeometry': {
      return <CylinderPrimitive storeId={storeId} propMesh={mesh} />;
    }
    case 'SphereGeometry': {
      return <SpherePrimitive storeId={storeId} propMesh={mesh} />;
    }
    case 'TorusGeometry': {
      return <TorusPrimitive storeId={storeId} propMesh={mesh} />;
    }
    default: {
      return <CubePrimitive storeId={storeId} propMesh={mesh} />;
    }
  }
};

const renderGroup = (storeId: string, propMesh?: THREE.Mesh) => {
  return <Group storeId={storeId} propMesh={propMesh} />;
};

const renderSelectedGroup = (storeId: string, propMesh?: THREE.Mesh) => {
  return <SelectedGroup storeId={storeId} propMesh={propMesh} />;
};

const renderAsset = (storeId: string, propMesh?: THREE.Mesh) => {
  return <AssetPrimitive storeId={storeId} propMesh={propMesh} />;
};

const renderLocalAsset = (storeId: string, file: File) => {
  return <LocalAssetPrimitive storeId={storeId} file={file} />;
};

const renderSpotLight = (
  storeId: string,
  light: THREE.SpotLight | THREE.Mesh
) => {
  return <SpotLight storeId={storeId} light={light} />;
};

const renderPointLight = (
  storeId: string,
  light: THREE.PointLight | THREE.Mesh
) => {
  return <PointLight storeId={storeId} light={light} />;
};

const renderPreviewCamera = (
  storeId: string,
  camera: THREE.PerspectiveCamera
) => {
  return <PreviewCamera storeId={storeId} camera={camera} />;
};

const renderObjects = (
  primitiveStore: PrimitiveStore,
  objectList: THREE.Object3D[],
  isNew?: boolean
) => {
  for (const object of objectList) {
    const storeId = isNew ? nanoid() : object.userData['storeId'];
    switch (object.name) {
      case 'GROUP':
        primitiveStore.addPrimitive(
          storeId,
          renderGroup(storeId, object as THREE.Mesh)
        );
        break;

      case 'SELECTED_GROUP':
        break;

      case 'ASSET':
        primitiveStore.addPrimitive(
          storeId,
          renderAsset(storeId, object as THREE.Mesh)
        );
        break;

      case 'CUBE':
      case 'CAPSULE':
      case 'CONE':
      case 'CYLINDER':
      case 'SPHERE':
      case 'TORUS':
        primitiveStore.addPrimitive(
          storeId,
          renderPrimitive(storeId, object as THREE.Mesh)
        );
        break;
      default:
        break;
    }
    switch (object.type) {
      case 'PerspectiveCamera':
        primitiveStore.addPrimitive(
          storeId,
          renderPreviewCamera(storeId, object as THREE.PerspectiveCamera)
        );
        break;
      case 'PointLight':
        primitiveStore.addPrimitive(
          storeId,
          renderPointLight(storeId, object as THREE.PointLight)
        );
        break;
      case 'SpotLight':
        primitiveStore.addPrimitive(
          storeId,
          renderSpotLight(storeId, object as THREE.SpotLight)
        );
        break;
    }
  }
  closeFullScreenLoading();
};

export {
  renderPrimitive,
  renderGroup,
  renderSelectedGroup,
  renderAsset,
  renderLocalAsset,
  renderObjects,
  renderSpotLight,
  renderPointLight
};
