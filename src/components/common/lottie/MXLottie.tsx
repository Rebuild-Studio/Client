import { useLottie } from 'lottie-react';
interface MXLottieSizeProps {
  width: number;
  height: number;
}

interface MXLottieProps {
  lottieJson: unknown;
  loop: boolean;
  style?: MXLottieSizeProps;
}

const MXLottie = (props: MXLottieProps) => {
  const options = {
    animationData: props.lottieJson,
    loop: props.loop,
    style: props.style
  };

  const { View } = useLottie(options);

  return <>{View}</>;
};

export type { MXLottieSizeProps };
export default MXLottie;
