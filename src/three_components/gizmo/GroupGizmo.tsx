import storeContainer from "@/store/storeContainer";
import { TransformControls } from "@react-three/drei";
import { observer } from "mobx-react";

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
          onMouseDown={() => {
            transformControlStore.setIsTranslated();
          }}
          onMouseUp={() => {
            transformControlStore.clearTransform();
          }}
        />
      )}
      {transformControlStore.isRotated && (
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
      {transformControlStore.isScaled && (
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
