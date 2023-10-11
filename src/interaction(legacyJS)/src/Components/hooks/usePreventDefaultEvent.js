import { useEffect } from "react";

export const usePreventDefaultEvent = () => {
  useEffect(() => {
    const handleWheel = (event) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    ["contextmenu", "dragstart", "dragover", "dblclick"].forEach(
      (eventName) => {
        window.addEventListener(eventName, (event) => {
          event.preventDefault();
        });
      }
    );
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);
};
