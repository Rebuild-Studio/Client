import { useEffect } from "react";

export const useExitAlert = () => {
  const handleExitAlert = (event) => {
      event.preventDefault();
      event.returnValue = "";
    }

  useEffect(() => {
    window.addEventListener("beforeunload", handleExitAlert );

    return () => {
      window.removeEventListener("beforeunload", handleExitAlert);
    };
  }, []);
};