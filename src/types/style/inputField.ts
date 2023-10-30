import { CSSHexColor, CSSRgba, CSSSize } from './cssUnits';

type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'url'
  | 'date'
  | 'time'
  | 'checkbox'
  | 'radio'
  | 'color'
  | 'file'
  | 'hidden'
  | 'search';

type CSSBorder =
  | `${string}`
  | `${CSSSize} ${string}`
  | `${string}  ${CSSRgba}`
  | `${string}  ${CSSHexColor}`
  | `${string} ${string} ${CSSRgba}`
  | `${string} ${string} ${CSSHexColor}`;

export type { InputType, CSSBorder };
