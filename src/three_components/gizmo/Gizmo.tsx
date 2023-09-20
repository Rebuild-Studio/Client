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
      {transformControlStore.isTranslated && (
        <TransformControls
          mode="translate"
          showX={hasSelectedPrimitive}
          showY={hasSelectedPrimitive}
          showZ={hasSelectedPrimitive}
          object={primitiveStore.meshes[props.storeId]}
          onMouseDown={(e) => {
            transformControlStore.setIsTranslated();
          }}
          onObjectChange={(e) => {
            primitiveStore.updateSelectedPrimitives(
              props.storeId,
              e?.target.object
            );
          }}
          onMouseUp={(e) => {
            transformControlStore.clearTransform();
          }}
        />
      )}
      {transformControlStore.isRotated && (
        <TransformControls
          mode="rotate"
          showX={hasSelectedPrimitive}
          showY={hasSelectedPrimitive}
          showZ={hasSelectedPrimitive}
          object={primitiveStore.meshes[props.storeId]}
          size={1.2}
          onMouseDown={(e) => {
            if (transformControlStore.currentControl !== "TRANSFORM") {
              transformControlStore.setIsRotated();
            }
          }}
          onObjectChange={(e) => {
            primitiveStore.updateSelectedPrimitives(
              props.storeId,
              e?.target.object
            );
          }}
          onMouseUp={(e) => {
            transformControlStore.clearTransform();
          }}
        />
      )}
      {transformControlStore.isScaled && (
        <TransformControls
          mode="scale"
          showX={hasSelectedPrimitive}
          showY={hasSelectedPrimitive}
          showZ={hasSelectedPrimitive}
          object={primitiveStore.meshes[props.storeId]}
          size={0.8}
          onMouseDown={(e) => {
            transformControlStore.setIsScaled();
          }}
          onObjectChange={(e) => {
            primitiveStore.updateSelectedPrimitives(
              props.storeId,
              e?.target.object
            );
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
