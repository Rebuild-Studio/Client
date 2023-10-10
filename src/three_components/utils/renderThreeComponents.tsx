import Group from "../group/Group";
import SelectedGroup from "../group/SelectedGroup";
import CapsulePrimitive from "../primitives/CapsulePrimitive";
import ConePrimitive from "../primitives/ConePrimitive";
import CubePrimitive from "../primitives/CubePrimitive";
import CylinderPrimitive from "../primitives/CylinderPrimitive";
import SpherePrimitive from "../primitives/SpherePrimitive";
import TorusPrimitive from "../primitives/TorusPrimitive";

const renderPrimitive = (storeId: string, mesh: THREE.Mesh) => {
  switch (mesh.geometry.type) {
    case "CapsuleGeometry": {
      return <CapsulePrimitive storeId={storeId} propMesh={mesh} />;
    }
    case "ConeGeometry": {
      return <ConePrimitive storeId={storeId} propMesh={mesh} />;
    }
    case "CylinderGeometry": {
      return <CylinderPrimitive storeId={storeId} propMesh={mesh} />;
    }
    case "SphereGeometry": {
      return <SpherePrimitive storeId={storeId} propMesh={mesh} />;
    }
    case "TorusGeometry": {
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

export { renderPrimitive, renderGroup, renderSelectedGroup };
