import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { observer } from 'mobx-react';
import { useServerGLTFLoader } from '@/hooks/loader';
import storeContainer from '@/store/storeContainer';
import canvasHistoryStore from '@store/canvasHistory.store.ts';
import { PrimitiveProps } from '../common/PrimitiveProps';

interface AssetPrimitiveProps extends PrimitiveProps {
  url?: string;
}

const AssetPrimitive = observer(
  ({ url, propMesh, storeId }: AssetPrimitiveProps) => {
    const ref = useRef();
    const { primitiveStore } = storeContainer;

    let mesh: THREE.Object3D;
    if (url) {
      const loadedData = useServerGLTFLoader(url);
      if (!(loadedData instanceof THREE.Group)) {
        mesh = loadedData.scene;
      } else {
        mesh = loadedData;
      }

      //[TBD] 추후 리팩토링으로 중복로직 제거 필요
      //scene을 벗겨내면서 animation정보가 사라짐. 이를 다시 넣어주는 작업 필요
      mesh.animations = loadedData.animations;
    } else if (propMesh) {
      mesh = propMesh;
    } else {
      return <></>;
    }

    mesh.name = 'ASSET';
    mesh.userData['storeId'] = storeId;
    mesh.userData['isLocked'] = false;

    useEffect(() => {
      primitiveStore.updatePrimitive(
        mesh.userData['storeId'],
        mesh as THREE.Mesh
      );
      canvasHistoryStore.differAdd(mesh.userData['storeId']);
    }, []);

    return (
      <primitive
        ref={ref}
        object={primitiveStore.meshes[storeId] ?? (mesh as THREE.Mesh)}
      />
    );
  }
);

export default AssetPrimitive;
