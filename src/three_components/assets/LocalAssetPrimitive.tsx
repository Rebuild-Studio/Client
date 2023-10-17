import { useEffect, useRef } from "react";
import * as THREE from "three";
import { observer } from "mobx-react";
import { useFileLoader } from "@/hooks/loader";
import canvasHistoryStore from "@/store/canvasHistoryStore";
import storeContainer from "@/store/storeContainer";
import { PrimitiveProps } from "../common/PrimitiveProps";

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

    object.name = "ASSET";
    object.userData["storeId"] = storeId;
    object.userData["isLocked"] = false;

    useEffect(() => {
      primitiveStore.updatePrimitive(
        object.userData["storeId"],
        object as THREE.Mesh
      );
      canvasHistoryStore.differAdd(object.userData["storeId"]);
    }, []);

    return <primitive ref={ref} object={object} />;
  }
);

export default LocalAssetPrimitveProps;
