import storeContainer from "@/store/storeContainer";
import { TransformControls } from "@react-three/drei";
import { observer } from "mobx-react";

interface GizmoProps {
  storeID: string;
}

const Gizmo = observer((props: GizmoProps) => {
  const { primitiveStore, transformControlStore } = storeContainer;
  return (
    <>
      {transformControlStore.isTranslating ? (
        <TransformControls
          showX={
            primitiveStore.selectedPrimitives[props.storeID] ? true : false
          }
          showY={
            primitiveStore.selectedPrimitives[props.storeID] ? true : false
          }
          showZ={
            primitiveStore.selectedPrimitives[props.storeID] ? true : false
          }
          mode="translate"
          object={primitiveStore.meshes[props.storeID]}
          onMouseDown={(e) => {
            transformControlStore.setIsTranslating();
          }}
          onObjectChange={(e) => {
            const copyData = primitiveStore.meshes[props.storeID].clone();
            copyData.position.set(
              e?.target.object.position.x,
              e?.target.object.position.y,
              e?.target.object.position.z
            );
            primitiveStore.updateSelectedPrimitives(props.storeID, copyData);
          }}
          onMouseUp={(e) => {
            transformControlStore.clearTransform();
          }}
        />
      ) : (
        ""
      )}
      {transformControlStore.isRotating ? (
        <TransformControls
          mode="rotate"
          showX={
            primitiveStore.selectedPrimitives[props.storeID] ? true : false
          }
          showY={
            primitiveStore.selectedPrimitives[props.storeID] ? true : false
          }
          showZ={
            primitiveStore.selectedPrimitives[props.storeID] ? true : false
          }
          object={primitiveStore.meshes[props.storeID]}
          size={1.2}
          onMouseDown={(e) => {
            if (transformControlStore.currentControl !== "TRANSFORM") {
              transformControlStore.setIsRotating();
            }
          }}
          onObjectChange={(e) => {
            const copyData = primitiveStore.meshes[props.storeID].clone();
            copyData.rotation.set(
              e?.target.object.rotation.x,
              e?.target.object.rotation.y,
              e?.target.object.rotation.z
            );
            primitiveStore.updateSelectedPrimitives(props.storeID, copyData);
          }}
          onMouseUp={(e) => {
            transformControlStore.clearTransform();
          }}
        />
      ) : (
        ""
      )}
      {transformControlStore.isScailing ? (
        <TransformControls
          showX={
            primitiveStore.selectedPrimitives[props.storeID] ? true : false
          }
          showY={
            primitiveStore.selectedPrimitives[props.storeID] ? true : false
          }
          showZ={
            primitiveStore.selectedPrimitives[props.storeID] ? true : false
          }
          mode="scale"
          object={primitiveStore.meshes[props.storeID]}
          size={0.8}
          onMouseDown={(e) => {
            transformControlStore.setIsScailing();
          }}
          onObjectChange={(e) => {
            const copyData = primitiveStore.meshes[props.storeID].clone();
            copyData.scale.set(
              e?.target.object.scale.x,
              e?.target.object.scale.y,
              e?.target.object.scale.z
            );
            primitiveStore.updateSelectedPrimitives(props.storeID, copyData);
          }}
          onMouseUp={(e) => {
            transformControlStore.clearTransform();
          }}
        />
      ) : (
        ""
      )}
    </>
  );
});

export default Gizmo;
