import { useEffect, useRef } from 'react';
import { CameraControls } from '@react-three/drei';
import storeContainer from '@/store/storeContainer';
import renderStore from '@store/render.store.ts';

export const CanvasHelper = () => {
  const cameraControlRef = useRef<any>();
  const { transformControlStore } = storeContainer;

  useEffect(() => {
    if (cameraControlRef.current) {
      renderStore.setControls(cameraControlRef.current);
    }
  }, [cameraControlRef.current]);
  return (
    <>
      <CameraControls
        ref={cameraControlRef}
        onChange={(e) => {
          if (e && e.type !== 'update') {
            transformControlStore.setIsFocused(true);
          }
        }}
      />
    </>
  );
};
