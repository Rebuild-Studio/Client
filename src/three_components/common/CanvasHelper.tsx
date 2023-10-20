import renderStore from "@/store/renderStore";
import storeContainer from "@/store/storeContainer";
import { CameraControls } from "@react-three/drei";
import { useEffect, useRef } from "react";

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
          if (e && e.type !== "update") {
            transformControlStore.setIsFocused(true);
          }
        }}
      />
    </>
  );
};
