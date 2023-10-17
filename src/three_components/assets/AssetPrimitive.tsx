import { useEffect, useRef } from "react";
import * as THREE from "three";
import { observer } from "mobx-react";
import canvasHistoryStore from "@store/canvasHistoryStore";
import storeContainer from "@store/storeContainer";
import { useServerGLTFLoader } from "@hooks/loader";
import { PrimitiveProps } from "../common/PrimitiveProps";

interface AssetPrimitveProps extends PrimitiveProps {
  url?: string;
}

const AssetPrimitive = observer(
  ({ url, propMesh, storeId }: AssetPrimitveProps) => {
    const ref = useRef();
    const { primitiveStore } = storeContainer;
    let mesh: THREE.Mesh;

    if (url) {
      const group = useServerGLTFLoader(url).scene;
      mesh = (group.children[0].clone() as THREE.Mesh) ?? propMesh;
    } else if (propMesh) {
      mesh = propMesh;
    } else {
      return <></>;
    }

    mesh.name = "ASSET";
    mesh.userData["storeId"] = storeId;
    mesh.userData["isLocked"] = false;

    useEffect(() => {
      primitiveStore.updatePrimitive(
        mesh.userData["storeId"],
        mesh as THREE.Mesh
      );
      canvasHistoryStore.differAdd(mesh.userData["storeId"]);
    }, []);

    return <primitive ref={ref} object={mesh} />;
  }
);

export default AssetPrimitive;
