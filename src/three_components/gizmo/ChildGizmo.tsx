import * as THREE from "three";
import { observer } from "mobx-react";
import { TransformControls } from "@react-three/drei";
import storeContainer from "@store/storeContainer";

const ChildGizmo = observer(() => {
  const { primitiveStore, transformControlStore } = storeContainer;
  const selectedChild = Object.values(primitiveStore.selectedPrimitives)[0];

  const rePositionParent = () => {
    const center = new THREE.Vector3();
    const parent = selectedChild.parent!;

    parent.children.forEach((child) => {
      center.add(child.getWorldPosition(new THREE.Vector3()));
    });
    center.divideScalar(parent.children.length);

    const newMesh = new THREE.Mesh();
    newMesh.name = "GROUP";
    newMesh.userData["storeId"] = parent.userData["storeId"];
    newMesh.position.copy(center);

    while (parent.children.length) {
      newMesh.attach(parent.children[0]);
    }

    parent.parent?.attach(newMesh);
    parent.removeFromParent();

    if (primitiveStore.meshes[newMesh.userData["storeId"]]) {
      primitiveStore.updatePrimitive(newMesh.userData["storeId"], newMesh);
    }
  };

  const isChildGizmoActivated = () => {
    return (
      selectedChild &&
      Object.keys(primitiveStore.selectedPrimitives).length < 2 &&
      !primitiveStore.meshes[selectedChild.userData["storeId"]] &&
      !selectedChild.userData["isLocked"]
    );
  };

  return (
    <>
      {isChildGizmoActivated() && (
        <>
          {transformControlStore.isTranslated && (
            <TransformControls
              mode="translate"
              object={selectedChild}
              onMouseDown={() => {
                transformControlStore.setIsTranslated();
              }}
              onMouseUp={() => {
                // 자식 position이 바뀌었으므로 parent position 재지정
                rePositionParent();
                transformControlStore.clearTransform();
              }}
            />
          )}
          {transformControlStore.isRotated && (
            <TransformControls
              mode="rotate"
              object={selectedChild}
              size={1.2}
              onMouseDown={() => {
                if (transformControlStore.currentControl !== "TRANSFORM") {
                  transformControlStore.setIsRotated();
                }
              }}
              onMouseUp={() => {
                transformControlStore.clearTransform();
              }}
            />
          )}
          {transformControlStore.isScaled && (
            <TransformControls
              mode="scale"
              object={selectedChild}
              size={0.8}
              onMouseDown={() => {
                transformControlStore.setIsScaled();
              }}
              onMouseUp={() => {
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
