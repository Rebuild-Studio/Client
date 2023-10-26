import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { observer } from 'mobx-react';
import { useFileLoader } from '@/hooks/loader';
import storeContainer from '@/store/storeContainer';
import canvasHistoryStore from '@store/canvasHistory.store.ts';
import { PrimitiveProps } from '../common/PrimitiveProps';

interface LocalAssetPrimitveProps extends PrimitiveProps {
  file: File;
}

const LocalAssetPrimitveProps = observer(
  ({ file, storeId }: LocalAssetPrimitveProps) => {
    const ref = useRef();
    const { primitiveStore } = storeContainer;

    const loadedData = useFileLoader(file);

    let mesh: THREE.Object3D;

    if (!(loadedData instanceof THREE.Group)) {
      mesh = loadedData.scene;
    } else {
      mesh = loadedData;
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
      <primitive ref={ref} object={primitiveStore.meshes[storeId] ?? mesh} />
    );
  }
);

export default LocalAssetPrimitveProps;
