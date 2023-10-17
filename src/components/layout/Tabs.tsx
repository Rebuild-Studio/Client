import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { CSSHexColor } from "@/types/style/cssUnits";
import { basicColors, bgColors } from "@resources/colors/colors";

type Props = {
  color?: CSSHexColor;
  backgroundColor?: CSSHexColor;
  selectedColor?: CSSHexColor;
  labelList: string[];
  width: string;
  height: string;
  underbarColor?: CSSHexColor;
  underbarWidth?: string;
  underbarHeight?: string;
  onChange?: (index: number) => void;
};

export const Tabs = ({
  color = basicColors.white,
  backgroundColor = bgColors[222222],
  selectedColor = "#2307a1",
  underbarColor = "#2307a1",
  labelList,
  width,
  height,
  underbarHeight = "4px",
  underbarWidth = "50px",
  onChange = () => {},
}: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const tabCount = labelList.length;

  useEffect(() => {
    if (!sliderRef.current) return;

    sliderRef.current.style.transform = `translateX(${selectedIndex * 100}%)`;
    onChange(selectedIndex);
  }, [selectedIndex]);

  return (
    <StyledTabs
      $backgroundColor={backgroundColor}
      $width={width}
      $height={height}
      $underbarHeight={underbarHeight}
    >
      <TapWrapper>
        {labelList.map((label, index) => (
          <Tab
            $tabCount={tabCount}
            $color={selectedIndex === index ? selectedColor : color}
            key={label}
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            <p>{label}</p>
          </Tab>
        ))}
      </TapWrapper>
      <Slider ref={sliderRef} $tabCount={tabCount}>
        <Indicator
          $height={underbarHeight}
          $width={underbarWidth}
          $color={underbarColor}
        />
      </Slider>
    </StyledTabs>
  );
};

type CSSStyledTabProps = {
  $backgroundColor: CSSHexColor;
  $width: string;
  $height: string;
  $underbarHeight: string;
};

type CSSTapProps = {
  $tabCount: number;
  $color: CSSHexColor;
};

type CSSSliderProps = {
  $tabCount: number;
};

type CSSIndicatorProps = {
  $width: string;
  $height: string;
  $color: CSSHexColor;
};

const StyledTabs = styled.div<CSSStyledTabProps>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  padding-bottom: ${({ $underbarHeight }) => $underbarHeight};
`;

const TapWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
`;

const Tab = styled.div<CSSTapProps>`
  width: ${({ $tabCount }) => 100 / $tabCount}%;
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Slider = styled.div<CSSSliderProps>`
  width: ${({ $tabCount }) => 100 / $tabCount}%;
  transition: all 0.33s cubic-bezier(0.38, 0.8, 0.32, 1.07);
`;

const Indicator = styled.div<CSSIndicatorProps>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  max-width: 100%;
  margin: 0 auto;
  background: ${({ $color }) => $color};
  border-radius: 1px;
`;
