import { shadows } from "@/resources/shadows/shadow";
import { CSSHexColor } from "@/types/style/CssUnits";
import { CSSShadow, ShadowType } from "@/types/style/Shadow";

const getShadow = (hex: CSSHexColor, type: ShadowType): CSSShadow => {
  return shadows[type](hex);
};

export { getShadow };
