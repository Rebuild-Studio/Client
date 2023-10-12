import { useServerGLTFLoader } from "@/hooks/loader";
import storeContainer from "@/store/storeContainer";
import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { PrimitiveProps } from "../common/PrimitiveProps";
import canvasHistoryStore from "@/store/canvasHistoryStore";

interface AssetPrimitveProps extends PrimitiveProps {
  url?: string;
}

const AssetPrimitive = observer((props: AssetPrimitveProps) => {
  const ref = useRef();
  const { primitiveStore } = storeContainer;
  let mesh: THREE.Mesh;

  if (props.url) {
    const group = useServerGLTFLoader(props.url).scene;
    mesh = (group.children[0].clone() as THREE.Mesh) ?? props.propMesh;
  } else if (props.propMesh) {
    mesh = props.propMesh;
  } else {
    return <></>;
  }

  mesh.name = "ASSET";
  mesh.userData["storeId"] = props.storeId;
  mesh.userData["isLocked"] = false;

  useEffect(() => {
    primitiveStore.updatePrimitive(
      mesh.userData["storeId"],
      mesh as THREE.Mesh
    );
    canvasHistoryStore.differAdd(mesh.userData["storeId"]);
  }, []);

  return <primitive ref={ref} object={mesh} />;
});

export default AssetPrimitive;
