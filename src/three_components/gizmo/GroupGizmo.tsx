import { observer } from "mobx-react";
import { TransformControls } from "@react-three/drei";
import storeContainer from "@store/storeContainer";

interface GroupGizmoProps {
  storeId: string;
}

const GroupGizmo = observer((props: GroupGizmoProps) => {
  const { primitiveStore, transformControlStore } = storeContainer;
  const isLocked = Object.values(primitiveStore.selectedPrimitives).find(
    (value) => {
      return value.userData["isLocked"] === true;
    }
  );
  return (
    <>
      {!isLocked && transformControlStore.isTranslated && (
        <TransformControls
          mode="translate"
          object={primitiveStore.meshes[props.storeId]}
          onMouseDown={() => {
            transformControlStore.setIsTranslated();
          }}
          onMouseUp={() => {
            transformControlStore.clearTransform();
          }}
        />
      )}
      {!isLocked && transformControlStore.isRotated && (
        <TransformControls
          mode="rotate"
          object={primitiveStore.meshes[props.storeId]}
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
      {!isLocked && transformControlStore.isScaled && (
        <TransformControls
          mode="scale"
          object={primitiveStore.meshes[props.storeId]}
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
  );
});

export default GroupGizmo;
