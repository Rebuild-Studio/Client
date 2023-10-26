import { ButtonAnimationType } from '@/types/style/buttonAnimations';
import { keyframes } from 'styled-components';

const ButtonAnimation = {
  translate: 'translate',
  bounce: 'bounce',
  shrink: 'shrink',
  enlarge: 'enlarge',
  none: 'none'
} as const satisfies { [key in ButtonAnimationType]: ButtonAnimationType };

const BounceAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

const TranslateToRightBottomAnimation = keyframes`
  0% { transform: translate(0, 0); }
  50% { transform: translate(3px, 3px); }
  100% { transform: translate(0, 0); }
`;

const ShrinkAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
`;

const EnlargeAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

/**
 * @description 버튼 클릭시 애니메이션(keyframe)을 반환합니다.
 * @param {ButtonAnimationType} clickAnimation
 * @returns keyframes
 */
const getButtonClickAnimation = (clickAnimation: ButtonAnimationType) => {
  switch (clickAnimation) {
    case ButtonAnimation.translate:
      return TranslateToRightBottomAnimation;
    case ButtonAnimation.bounce:
      return BounceAnimation;
    case ButtonAnimation.shrink:
      return ShrinkAnimation;
    case ButtonAnimation.enlarge:
      return EnlargeAnimation;
    case ButtonAnimation.none:
      return '';
  }
};

export { getButtonClickAnimation };
export type { ButtonAnimation };
