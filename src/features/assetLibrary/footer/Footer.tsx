import MenuButton from "@/components/common/MenuButton";
import { basicColors, grayColors } from "@/resources/colors/colors";
import { getButtonClickAnimation } from "@/utils/animation/button";
import styled, { css } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;

  & > * {
    margin-left: 10px;
  }
`;

const LoadButton = styled(MenuButton)`
  background-color: ${basicColors.limeGreen};
  border: 1px solid ${grayColors.lightGray};
  &:active {
    animation: ${css`
      ${getButtonClickAnimation("translate")} 0.2s ease-in-out
    `};
  }
`;

const CancelButton = styled(LoadButton)`
  background-color: ${basicColors.black};
  color: ${basicColors.white};
  &:hover {
    background-color: ${grayColors.panelGray};
  }
`;

const Footer = () => {
  return (
    <Container>
      <LoadButton
        label="불러오기"
        disabled={false}
        onClick={() => {
          /* 추후 modal close state control 달것 */
          /* asset Load 기능 구현 */
        }}
      />
      <CancelButton
        label="닫기"
        disabled={false}
        onClick={() => {
          /* 추후 modal close state control 달것 */
        }}
      />
    </Container>
  );
};

export default Footer;
