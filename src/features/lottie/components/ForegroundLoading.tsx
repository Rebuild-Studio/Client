import { styled } from "styled-components";
import LoadingLottie from "../assets/loading.json";
import MXLottie, {
  MXLottieSizeProps,
} from "@/components/common/lottie/MXLottie";

const ForegroundLoading = () => {
  const style: MXLottieSizeProps = {
    width: 100,
    height: 100,
  };
  return (
    <ForegroundLoadingWrapper>
      <ForegroundLoadingContent>
        <MXLottie lottieJson={LoadingLottie} loop={true} style={style} />
      </ForegroundLoadingContent>
    </ForegroundLoadingWrapper>
  );
};

const ForegroundLoadingWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 30vh;
  width: 30vh;
`;

const ForegroundLoadingContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default ForegroundLoading;
