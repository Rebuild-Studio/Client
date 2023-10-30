import { nanoid } from 'nanoid';
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

const renderSpotLight = (storeId: string, propMesh?: THREE.Mesh) => {
  return <SpotLight storeId={storeId} propMesh={propMesh} />;
};

const renderPointLight = (storeId: string, propMesh?: THREE.Mesh) => {
  return <PointLight storeId={storeId} propMesh={propMesh} />;
};

const renderObjects = (
  // TODO : store 타입 필요
  primitiveStore: any,
  meshList: THREE.Mesh[],
  isNew?: boolean
) => {
  for (const mesh of meshList) {
    const storeId = isNew ? nanoid() : mesh.userData['storeId'];
    switch (mesh.name) {
      case 'GROUP':
        primitiveStore.addPrimitive(
          storeId,
          renderGroup(storeId, mesh.clone())
        );
        break;

      case 'SELECTED_GROUP':
        break;

      case 'ASSET':
        primitiveStore.addPrimitive(
          storeId,
          renderAsset(storeId, mesh.clone())
        );
        break;
      case 'SPOT_LIGHT':
        primitiveStore.addPrimitive(
          storeId,
          renderSpotLight(storeId, mesh.clone())
        );
        break;
      case 'POINT_LIGHT':
        primitiveStore.addPrimitive(
          storeId,
          renderPointLight(storeId, mesh.clone())
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
          renderPrimitive(storeId, mesh.clone())
        );
        break;
      default:
        break;
    }
  }
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
