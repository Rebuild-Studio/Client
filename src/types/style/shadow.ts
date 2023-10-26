import { shadows } from '@/resources/shadows/shadow';
import { CSSHexColor, CSSRgba } from './cssUnits';

type CSSShadow =
  | 'none'
  | `${string} ${CSSRgba}`
  | `${string} ${string} ${CSSRgba}`
  | `${string} ${string} ${string} ${CSSRgba}`
  | `${string} ${string} ${string} ${string} ${CSSRgba}`;

type Shadows = { [key: string]: (hex: CSSHexColor) => CSSShadow };

type ShadowType = keyof typeof shadows;

export type { CSSShadow, Shadows, ShadowType };
