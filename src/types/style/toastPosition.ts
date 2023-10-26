import { CSSProperties } from 'react';

type ToastPosition =
  | 'topCenter'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight';

const POSITION_VARIANTS: Record<ToastPosition, CSSProperties> = {
  topCenter: {
    top: '10%',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  topLeft: {
    top: '10%',
    left: '10%'
  },
  topRight: {
    top: '10%',
    right: '10%'
  },
  bottomLeft: {
    bottom: '10%',
    left: '10%'
  },
  bottomCenter: {
    bottom: '10%',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  bottomRight: {
    bottom: '10%',
    right: '10%'
  }
};

export type { ToastPosition };
export { POSITION_VARIANTS };
