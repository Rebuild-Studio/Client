import { useState, useEffect } from "react";

function useShiftKeyListener() {
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Shift") setIsShiftPressed(true);
    }

    function handleKeyUp(e) {
      if (e.key === "Shift") setIsShiftPressed(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return isShiftPressed;
}

export default useShiftKeyListener;
