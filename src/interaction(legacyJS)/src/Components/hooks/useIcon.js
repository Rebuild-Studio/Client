import { useMemo } from "react";

const activeAdditive = "_활성화";

export default function useIcon(
  name,
  options = {
    path: "/legacyJS/Icons/Studio/Interaction/",
    extension: "svg",
  }
) {
  return useMemo(
    () => ({
      root: `url(${
        options.path ?? "/legacyJS/Icons/Studio/Interaction/"
      }${name}.${options.extension ?? "svg"})`,
      active: `url(${
        options.path ?? "/legacyJS/Icons/Studio/Interaction/"
      }${name}${activeAdditive}.${options.extension ?? "svg"})`,
    }),
    []
  );
}
