import * as THREE from "three";
import { Outline } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import storeContainer from "@store/storeContainer";

const SelectedOutline = () => {
  const { primitiveStore } = storeContainer;

  const getAllMeshes = () => {
    const meshes: Array<THREE.Object3D<THREE.Event>> = [];

    Object.values(primitiveStore.selectedPrimitives).forEach((value) => {
      switch (value.name) {
        case "GROUP": {
          value.traverse((child) => {
            meshes.push(child);
          });
          break;
        }
        case "SELECTED_GROUP": {
          break;
        }
        default: {
          meshes.push(value);
        }
      }
    });

    return meshes;
  };

  return (
    <Outline
      selection={getAllMeshes()}
      edgeStrength={9}
      pulseSpeed={0.5}
      blendFunction={BlendFunction.ALPHA}
      visibleEdgeColor={0xd4ed3e}
      hiddenEdgeColor={0xf42696}
      selectionLayer={10}
    />
  );
};

export default SelectedOutline;
