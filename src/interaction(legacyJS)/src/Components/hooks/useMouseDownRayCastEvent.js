import { useEffect } from "react";
import EventFunctions_VM from "../view_models/EventFunctions_VM";
import storeContainer from "../stores/storeContainer";

export const useMouseDownRayCastEvent = () => {
  const { onMouseDown } = EventFunctions_VM();
  const { common_store } = storeContainer;
  useEffect(() => {
    const canvas = document.getElementById("canvas");

    if (!common_store.isPreview) {
      canvas.addEventListener("mousedown", onMouseDown);
    } else if (common_store.isPreview) {
      canvas.removeEventListener("mousedown", onMouseDown);
    }
    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
    };
  }, [common_store.isPreview]);
};
