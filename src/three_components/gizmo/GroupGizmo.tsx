import storeContainer from "@/store/storeContainer";
import { TransformControls } from "@react-three/drei";
import { observer } from "mobx-react";
import * as THREE from "three";

interface GroupGizmoProps {
  storeId: string;
}

const GroupGizmo = observer((props: GroupGizmoProps) => {
  const { primitiveStore, transformControlStore } = storeContainer;
  return (
    <>
      {transformControlStore.isTranslated && (
        <TransformControls
          mode="translate"
          object={primitiveStore.meshes[props.storeId]}
          onMouseDown={(e) => {
            transformControlStore.setIsTranslated();
          }}
          onMouseUp={(e) => {
            transformControlStore.clearTransform();
          }}
        />
      )}
      {transformControlStore.isRotated && (
        <TransformControls
          mode="rotate"
          object={primitiveStore.meshes[props.storeId]}
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
          object={primitiveStore.meshes[props.storeId]}
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
  );
});

export default GroupGizmo;
