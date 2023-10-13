import renderStore from "@/store/renderStore";
import { CameraControls } from "@react-three/drei";
import { useEffect, useRef } from "react";

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
