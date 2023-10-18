import storeContainer from "@/store/storeContainer";
import { TransformControls } from "@react-three/drei";
import { observer } from "mobx-react";
import { setCameraControlEnabled } from "../utils/cameraControl";

interface GizmoProps {
  storeId: string;
}

const Gizmo = observer((props: GizmoProps) => {
  const { primitiveStore, transformControlStore } = storeContainer;
  const hasSelectedPrimitive = primitiveStore.selectedPrimitives[props.storeId]
    ? true
    : false;
  const isLocked = Object.values(primitiveStore.selectedPrimitives).find(
    (value) => {
      return value.userData["isLocked"] === true;
    }
  );

  return (
    <>
      {!isLocked &&
        Object.keys(primitiveStore.selectedPrimitives).length < 2 && (
          <>
            {transformControlStore.isTranslated && (
              <TransformControls
                mode="translate"
                showX={hasSelectedPrimitive}
                showY={hasSelectedPrimitive}
                showZ={hasSelectedPrimitive}
                object={primitiveStore.meshes[props.storeId]}
                onMouseDown={() => {
                  transformControlStore.setIsTranslated();
                  setCameraControlEnabled(false);
                }}
                onObjectChange={(e) => {
                  primitiveStore.updateSelectedPrimitives(
                    props.storeId,
                    e?.target.object
                  );
                }}
                onMouseUp={() => {
                  transformControlStore.clearTransform();
                  setCameraControlEnabled(true);
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
                onMouseDown={() => {
                  if (transformControlStore.currentControl !== "TRANSFORM") {
                    transformControlStore.setIsRotated();
                  }
                  setCameraControlEnabled(false);
                }}
                onObjectChange={(e) => {
                  primitiveStore.updateSelectedPrimitives(
                    props.storeId,
                    e?.target.object
                  );
                }}
                onMouseUp={() => {
                  transformControlStore.clearTransform();
                  setCameraControlEnabled(true);
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
                onMouseDown={() => {
                  transformControlStore.setIsScaled();
                  setCameraControlEnabled(false);
                }}
                onObjectChange={(e) => {
                  primitiveStore.updateSelectedPrimitives(
                    props.storeId,
                    e?.target.object
                  );
                }}
                onMouseUp={() => {
                  transformControlStore.clearTransform();
                  setCameraControlEnabled(true);
                }}
              />
            )}
          </>
        )}
    </>
  );
});

export default Gizmo;
