import { useEffect, useRef } from "react";
import { CameraControls } from "@react-three/drei";
import renderStore from "@store/renderStore";

export const CanvasHelper = () => {
  const cameraControlRef = useRef<any>();

  useEffect(() => {
    if (cameraControlRef.current) {
      renderStore.setControls(cameraControlRef.current);
    }
  }, [cameraControlRef.current]);
  return (
    <>
      <CameraControls ref={cameraControlRef} />
    </>
  );
};
