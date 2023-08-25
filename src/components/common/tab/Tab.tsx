import { basicColors, bgColors, grayColors } from "@/resources/colors/colors";
import { fonts } from "@/resources/fonts/font";
import { CSSHexColor, CSSSize } from "@/types/style/CssUnits";
import styled from "styled-components";

type TabImageGravity = "TOP" | "RIGHT" | "BOTTOM" | "LEFT";

interface TabProps {
  label: string;
  width: CSSSize;
  height: CSSSize;
  isSelected: boolean;
  onClick: () => void;
  $selectedColor?: CSSHexColor;
  $defaultColor?: CSSHexColor;
  isImgVisible?: boolean;
  defaultImgUri?: string;
  selectedImgUri?: string;
  $imgGravity?: TabImageGravity;
  $imgWidth?: CSSSize;
  $imgHeight?: CSSSize;
}

interface TabWrapperProps {
  width: CSSSize;
  height: CSSSize;
  onClick: () => void;
}

interface TabContentWrapperProps {
  $imgGravity: TabImageGravity;
}

interface TabImgProps {
  width: CSSSize;
  height: CSSSize;
}

interface TabLabelProps {
  isSelected: boolean;
  $selectedColor: CSSHexColor;
  $defaultColor: CSSHexColor;
}

const TabWrapper = styled.div<TabWrapperProps>`
  box-sizing: border-box;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  cursor: pointer;
  display: ${({ width }) =>
    width === "fit-content" ? "inline-block" : "block"};
`;

const TabContentWrapper = styled.div<TabContentWrapperProps>`
  display: flex;
  flex-direction: ${({ $imgGravity }) =>
    $imgGravity === "LEFT"
      ? "row"
      : $imgGravity === "RIGHT"
      ? "row"
      : "column"};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const TabImg = styled.img<TabImgProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: 4px;
`;

const TabLabel = styled.span<TabLabelProps>`
  color: ${(props) =>
    props.isSelected ? props.$selectedColor : props.$defaultColor};
  font-weight: ${(props) => (props.isSelected ? 700 : 500)};
  font-size: ${fonts.default};
`;

const Tab = ({
  label = "TAB",
  width = "fit-content",
  height = "fit-content",
  isSelected = false,
  onClick = () => {},
  $selectedColor = basicColors.white,
  $defaultColor = grayColors[535353],
  isImgVisible = false,
  defaultImgUri = "",
  selectedImgUri = "",
  $imgGravity = "LEFT",
  $imgWidth = "14px",
  $imgHeight = "14px",
}: TabProps) => {
  const generateContent = () => {
    switch ($imgGravity) {
      case "LEFT":
      case "TOP":
        return (
          <TabContentWrapper $imgGravity={$imgGravity}>
            {isImgVisible && defaultImgUri ? (
              <TabImg
                width={$imgWidth}
                height={$imgHeight}
                src={isSelected ? selectedImgUri : defaultImgUri}
              />
            ) : (
              ""
            )}
            <TabLabel
              isSelected={isSelected}
              $selectedColor={$selectedColor}
              $defaultColor={$defaultColor}
            >
              {label}
            </TabLabel>
          </TabContentWrapper>
        );
      case "RIGHT":
      case "BOTTOM":
        return (
          <TabContentWrapper $imgGravity={$imgGravity}>
            <TabLabel
              isSelected={isSelected}
              $selectedColor={$selectedColor}
              $defaultColor={$defaultColor}
            >
              {label}
            </TabLabel>
            {defaultImgUri ? (
              <TabImg
                width={$imgWidth}
                height={$imgHeight}
                src={isSelected ? selectedImgUri : defaultImgUri}
              />
            ) : (
              ""
            )}
          </TabContentWrapper>
        );
    }
  };
  return (
    <TabWrapper width={width} height={height} onClick={onClick}>
      {generateContent()}
    </TabWrapper>
  );
};

export default Tab;
