import { useFileLoader } from "@/hooks/loader";
import storeContainer from "@/store/storeContainer";
import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { PrimitiveProps } from "../common/PrimitiveProps";
import canvasHistoryStore from "@/store/canvasHistoryStore";

interface LocalAssetPrimitveProps extends PrimitiveProps {
  file: File;
}

const LocalAssetPrimitveProps = observer(
  ({ file, storeId }: LocalAssetPrimitveProps) => {
    const ref = useRef();
    const { primitiveStore } = storeContainer;

    const loadedData = useFileLoader(file);

    let object: THREE.Object3D;

    if (!(loadedData instanceof THREE.Group)) {
      object = loadedData.scene;
    } else {
      object = loadedData;
    }

    const mesh = new THREE.Mesh();

    mesh.name = "ASSET";
    mesh.userData["storeId"] = storeId;
    mesh.userData["isLocked"] = false;

    useEffect(() => {
      mesh.attach(object);
      primitiveStore.updatePrimitive(mesh.userData["storeId"], mesh);
      canvasHistoryStore.differAdd(mesh.userData["storeId"]);
    }, []);

    return (
      <primitive ref={ref} object={primitiveStore.meshes[storeId] ?? object} />
    );
  }
);

export default LocalAssetPrimitveProps;
