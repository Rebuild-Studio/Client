import { observer } from 'mobx-react';
import { TransformControls } from '@react-three/drei';
import controllerBarStore from '@/features/controllerBar/store/controllerBar.store.ts';
import storeContainer from '@/store/storeContainer';
import { setCameraControlEnabled } from '../utils/cameraControl';

interface GizmoProps {
  storeId: string;
}

const Gizmo = (props: GizmoProps) => {
  const { primitiveStore, transformControlStore } = storeContainer;
  const hasSelectedPrimitive = primitiveStore.selectedPrimitives[props.storeId]
    ? true
    : false;
  const isLocked = Object.values(primitiveStore.selectedPrimitives).find(
    (value) => {
      return value.userData['isLocked'] === true;
    }
  );
  const { snapMode } = controllerBarStore;

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
                translationSnap={snapMode.GRID ? 0.5 : null}
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
                  if (transformControlStore.currentControl !== 'TRANSFORM') {
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
};

const Observer = observer(Gizmo);
export default Observer;
