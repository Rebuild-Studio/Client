import { useState } from 'react';
import { styled } from 'styled-components';
import { basicColors, bgColors, grayColors } from '@/resources/colors/colors';
import { CSSSize } from '@/types/style/cssUnits';
import { CSSBorder } from '@/types/style/inputField';

type Props = {
  thumbnail: string;
  isClicked: boolean;
  name?: string;
  width?: CSSSize;
  height?: CSSSize;
  imageWidth?: CSSSize;
  imageHeight?: CSSSize;
  border?: CSSBorder;
  alt?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
};

export const Card = ({
  thumbnail,
  isClicked,
  name = '',
  width = '245px',
  height = '245px',
  imageWidth = '90%',
  imageHeight = '90%',
  border = '1px dotted #fff',
  alt = 'error',
  hoverEffect = true,
  onClick
}: Props) => {
  const [srcError, setSrcError] = useState(false);
  return (
    <StyledCard
      $width={width}
      $height={height}
      $border={border}
      $isClicked={isClicked}
      $hoverEffect={hoverEffect}
      onClick={onClick}
    >
      {srcError ? (
        <StyledAlt>{alt}</StyledAlt>
      ) : (
        <StyledCardImg
          onError={() => {
            setSrcError(true);
          }}
          $imageWidth={imageWidth}
          $ImageHeight={imageHeight}
          src={thumbnail}
          alt="library"
        />
      )}
      <StyledCardTextArea>{name}</StyledCardTextArea>
    </StyledCard>
  );
};

type CSSStyledCardProps = {
  $isClicked: boolean;
  $width: CSSSize;
  $height: CSSSize;
  $border: CSSBorder;
  $hoverEffect: boolean;
};

const StyledCard = styled.div<CSSStyledCardProps>`
  cursor: pointer;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
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
  outline: ${({ $isClicked, $border }) =>
    $isClicked ? `solid 2px ${basicColors.lightLimeGreen}` : `${$border}`};

  ${({ $hoverEffect }) =>
    $hoverEffect
      ? `  &:hover {
    background-repeat: no-repeat;
    background-color: transparent;
    background-size: 100% 100%;
  }`
      : ``}
`;

type CSSStyledCardImg = {
  $imageWidth: CSSSize;
  $ImageHeight: CSSSize;
};

const StyledCardImg = styled.img<CSSStyledCardImg>`
  width: ${({ $imageWidth }) => $imageWidth};
  height: ${({ $ImageHeight }) => $ImageHeight};
`;

const StyledAlt = styled.div`
  color: ${basicColors.white};
`;

// TODO : 폰트 적용 필요
const StyledCardTextArea = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${grayColors.E2E2E2};
  line-height: 1.5;
  letter-spacing: 0.00938em;
`;
