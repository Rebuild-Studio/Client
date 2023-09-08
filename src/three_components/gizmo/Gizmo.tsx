import storeContainer from "@/store/storeContainer";
import { TransformControls } from "@react-three/drei";
import { observer } from "mobx-react";

interface GizmoProps {
  storeId: string;
}

const Gizmo = observer((props: GizmoProps) => {
  const { primitiveStore, transformControlStore } = storeContainer;
  const hasSelectedPrimitive = primitiveStore.selectedPrimitives[props.storeId]
    ? true
    : false;

  return (
    <>
      {transformControlStore.isTranslating && (
        <TransformControls
          mode="translate"
          showX={hasSelectedPrimitive}
          showY={hasSelectedPrimitive}
          showZ={hasSelectedPrimitive}
          object={primitiveStore.meshes[props.storeId]}
          onMouseDown={(e) => {
            transformControlStore.setIsTranslating();
          }}
          onObjectChange={(e) => {
            const copyData = primitiveStore.meshes[props.storeId].clone();
            copyData.position.set(
              e?.target.object.position.x,
              e?.target.object.position.y,
              e?.target.object.position.z
            );
            primitiveStore.updateSelectedPrimitives(props.storeId, copyData);
          }}
          onMouseUp={(e) => {
            transformControlStore.clearTransform();
          }}
        />
      )}
      {transformControlStore.isRotating && (
        <TransformControls
          mode="rotate"
          showX={hasSelectedPrimitive}
          showY={hasSelectedPrimitive}
          showZ={hasSelectedPrimitive}
          object={primitiveStore.meshes[props.storeId]}
          size={1.2}
          onMouseDown={(e) => {
            if (transformControlStore.currentControl !== "TRANSFORM") {
              transformControlStore.setIsRotating();
            }
          }}
          onObjectChange={(e) => {
            const copyData = primitiveStore.meshes[props.storeId].clone();
            copyData.rotation.set(
              e?.target.object.rotation.x,
              e?.target.object.rotation.y,
              e?.target.object.rotation.z
            );
            primitiveStore.updateSelectedPrimitives(props.storeId, copyData);
          }}
          onMouseUp={(e) => {
            transformControlStore.clearTransform();
          }}
        />
      )}
      {transformControlStore.isScaling && (
        <TransformControls
          mode="scale"
          showX={hasSelectedPrimitive}
          showY={hasSelectedPrimitive}
          showZ={hasSelectedPrimitive}
          object={primitiveStore.meshes[props.storeId]}
          size={0.8}
          onMouseDown={(e) => {
            transformControlStore.setIsScaling();
          }}
          onObjectChange={(e) => {
            const copyData = primitiveStore.meshes[props.storeId].clone();
            copyData.scale.set(
              e?.target.object.scale.x,
              e?.target.object.scale.y,
              e?.target.object.scale.z
            );
            primitiveStore.updateSelectedPrimitives(props.storeId, copyData);
          }}
          onMouseUp={(e) => {
            transformControlStore.clearTransform();
          }}
        />
      )}
    </>
  );
});

export default Gizmo;
