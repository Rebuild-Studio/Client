import { basicColors, bgColors, grayColors } from '@/resources/colors/colors';
import { styled } from 'styled-components';

export type CSSStyledCardProps = {
  $isClicked: boolean;
};

export const StyledCard = styled.div<CSSStyledCardProps>`
  cursor: pointer;
  width: 245px;
  height: 244px;
  margin-top: 20px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  flex-direction: column;
  background-color: ${bgColors[343434]};
  background-image: linear-gradient(
    to bottom,
    rgba(28, 28, 28, 0.9) 0%,
    rgba(28, 28, 28, 0.28) 23%,
    rgba(28, 28, 28, 0) 44%,
    rgba(28, 28, 28, 0) 56%,
    rgba(28, 28, 28, 0.28) 77%,
    rgba(28, 28, 28, 0.9) 100%
  );
  color: ${bgColors[343434]};
  position: relative;
  outline: ${({ $isClicked }) =>
    $isClicked ? `solid 2px ${basicColors.lightLimeGreen}` : 'none'};

  &:hover {
    background-repeat: no-repeat;
    background-color: transparent;
    background-size: 100% 100%;
    border-radius: 0;
  }
`;

// TODO : 폰트 적용 필요
export const StyledCardTextArea = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${grayColors.E2E2E2};
  line-height: 1.5;
  letter-spacing: 0.00938em;
`;

export const StyledCardTextAreaBox = styled.div`
  position: absolute;
  top: 151px;
`;

export const StyledGrid = styled.div`
  width: 100%;
  padding: 20px 0px;
  height: 100%;
  display: flex;
  flex-flow: wrap;
  overflow-y: auto;
  gap: 30px;
  box-sizing: border-box;
  background-color: ${bgColors[282828]};
  padding-left: 30px;
`;
