import { fonts } from '@resources/fonts/font';
import { CSSSize } from './cssUnits';

type Fonts = { [key: string]: CSSSize };

type FontType = keyof typeof fonts;

export type { FontType, Fonts };
