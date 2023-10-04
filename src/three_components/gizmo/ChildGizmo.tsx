import storeContainer from "@/store/storeContainer";
import { TransformControls } from "@react-three/drei";
import { observer } from "mobx-react";
import { findRootGroup } from "../utils/findGroup";
import * as THREE from "three";
import getCenterPoint from "../utils/getCenterPoint";

const ChildGizmo = observer(() => {
  const { primitiveStore, transformControlStore } = storeContainer;

  const selectedChild = Object.values(primitiveStore.selectedPrimitives)[0];

  return (
    <>
      {selectedChild &&
        Object.keys(primitiveStore.selectedPrimitives).length < 2 &&
        !primitiveStore.meshes[selectedChild.userData["storeId"]] &&
        !selectedChild.userData["isLocked"] && (
          <>
            {transformControlStore.isTranslated && (
              <TransformControls
                mode="translate"
                object={selectedChild}
                onMouseDown={(e) => {
                  transformControlStore.setIsTranslated();
                }}
                onMouseUp={(e) => {
                  //   const rootObject = findRootGroup(selectedChild);

                  //   let x = 0;
                  //   let y = 0;
                  //   let z = 0;

                  //   rootObject?.children.forEach((value) => {
                  //     const pos = value.getWorldPosition(new THREE.Vector3());
                  //     x += pos.x;
                  //     y += pos.y;
                  //     z += pos.z;
                  //   });

                  //   rootObject?.position.set(
                  //     ...getCenterPoint(x, y, z, rootObject.children.length)
                  //   );

                  transformControlStore.clearTransform();
                }}
              />
            )}
            {transformControlStore.isRotated && (
              <TransformControls
                mode="rotate"
                object={selectedChild}
                size={1.2}
                onMouseDown={(e) => {
                  if (transformControlStore.currentControl !== "TRANSFORM") {
                    transformControlStore.setIsRotated();
                  }
                }}
                onMouseUp={(e) => {
                  transformControlStore.clearTransform();
                }}
              />
            )}
            {transformControlStore.isScaled && (
              <TransformControls
                mode="scale"
                object={selectedChild}
                size={0.8}
                onMouseDown={(e) => {
                  transformControlStore.setIsScaled();
                }}
                onMouseUp={(e) => {
                  transformControlStore.clearTransform();
                }}
              />
            )}
          </>
        )}
    </>
  );
});

export default ChildGizmo;
