import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { observer } from 'mobx-react';
import { useFileLoader } from '@/hooks/loader';
import storeContainer from '@/store/storeContainer';
import { closeFullScreenLoading } from '@/utils/loading/loadingHandler';
import canvasHistoryStore from '@store/canvasHistory.store.ts';
import { PrimitiveProps } from '../common/PrimitiveProps';

interface LocalAssetPrimitiveProps extends PrimitiveProps {
  file: File;
}

const LocalAssetPrimitiveProps = observer(
  ({ file, storeId }: LocalAssetPrimitiveProps) => {
    const ref = useRef();
    const { primitiveStore } = storeContainer;

    const loadedData = useFileLoader(file);

    let mesh: THREE.Object3D;

    if (!(loadedData instanceof THREE.Group)) {
      mesh = loadedData.scene;
    } else {
      mesh = loadedData;
    }
    //[TBD] 추후 리팩토링으로 중복로직 제거 필요
    //scene을 벗겨내면서 animation정보가 사라짐. 이를 다시 넣어주는 작업 필요
    mesh.animations = loadedData.animations;

    mesh.name = 'ASSET';
    mesh.userData['storeId'] = storeId;
    mesh.userData['isLocked'] = false;

    useEffect(() => {
      primitiveStore.updatePrimitive(
        mesh.userData['storeId'],
        mesh as THREE.Mesh
      );
      canvasHistoryStore.differAdd(mesh.userData['storeId']);
      closeFullScreenLoading();
    }, []);

    return (
      <primitive ref={ref} object={primitiveStore.meshes[storeId] ?? mesh} />
    );
  }
);

export default LocalAssetPrimitiveProps;
