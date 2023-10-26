import { shadows } from '@/resources/shadows/shadow';
import { CSSHexColor } from '@/types/style/cssUnits';
import { CSSShadow, ShadowType } from '@/types/style/shadow';

const getShadow = (hex: CSSHexColor, type: ShadowType): CSSShadow => {
  return shadows[type](hex);
};

export { getShadow };
