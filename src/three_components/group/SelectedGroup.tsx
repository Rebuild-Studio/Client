import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { observer } from 'mobx-react';
import { useThree } from '@react-three/fiber';
import storeContainer from '@/store/storeContainer';
import GroupGizmo from '../gizmo/GroupGizmo';
import { getParent } from '../utils/findGroup';
import getCenterPoint from '../utils/getCenterPoint';

interface SelectedGroupProps {
  storeId: string;
  propMesh?: THREE.Mesh;
}

const SelectedGroup = (props: SelectedGroupProps) => {
  const ref = useRef();
  const { primitiveStore } = storeContainer;
  const scene = useThree((state) => state.scene);
  const childrenMeshes: Array<THREE.Mesh> = [];

  const geometry = new THREE.BufferGeometry();
  const material = new THREE.MeshPhysicalMaterial({
    transparent: true
  });
  const mesh = props.propMesh ?? new THREE.Mesh(geometry, material);
  mesh.name = 'SELECTED_GROUP';
  mesh.userData['storeId'] = props.storeId;

  useEffect(() => {
    // selected 추가
    const selectedPrimitives = Object.values(primitiveStore.selectedPrimitives);

    let x = 0;
    let y = 0;
    let z = 0;

    selectedPrimitives.forEach((value) => {
      x += value.getWorldPosition(new THREE.Vector3()).x;
      y += value.getWorldPosition(new THREE.Vector3()).y;
      z += value.getWorldPosition(new THREE.Vector3()).z;
    });

    mesh.position.set(...getCenterPoint(x, y, z, selectedPrimitives.length));

    selectedPrimitives.forEach((value) => {
      childrenMeshes.push(value);
      mesh.attach(value);
    });

    primitiveStore.updatePrimitive(props.storeId, mesh);

    return () => {
      try {
        childrenMeshes.forEach((child) => {
          // meshes에 있는 지 확인
          if (primitiveStore.meshes[child.userData['storeId']]) {
            scene.attach(child);
          } else {
            if (!child.userData['isLeave']) {
              const parent = getParent(
                child.userData['rootId'],
                child.userData['parentId']
              );
              delete child.userData['rootId'];
              delete child.userData['parentId'];
              parent?.attach(child);
            }
          }
        });
      } catch (e) {
        console.error(e);
      }

      primitiveStore.removePrimitive(props.storeId);
    };
  }, []);

  return (
    <>
      <GroupGizmo storeId={props.storeId} />
      <primitive
        ref={ref}
        object={primitiveStore.meshes[props.storeId] ?? mesh}
      />
    </>
  );
};

const Observer = observer(SelectedGroup);
export default Observer;
