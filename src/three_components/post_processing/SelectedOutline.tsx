import * as THREE from 'three';
import { Outline } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

interface SelectedOutlineProps {
  meshes: Array<THREE.Object3D<THREE.Event>>;
}

const SelectedOutline = (props: SelectedOutlineProps) => {
  const getAllMeshes = () => {
    const meshes: Array<THREE.Object3D<THREE.Event>> = [];

    props.meshes.forEach((value) => {
      switch (value.name) {
        case 'GROUP': {
          value.traverse((child) => {
            meshes.push(child);
          });
          break;
        }
        case 'SELECTED_GROUP': {
          break;
        }
        case 'ASSET': {
          value.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              meshes.push(child);
            }
          });
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
