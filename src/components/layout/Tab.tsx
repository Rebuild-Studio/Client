import styled from "styled-components";
import { basicColors, bgColors, grayColors } from "@/resources/colors/colors";
import { CSSHexColor } from "@/types/style/cssUnits";

interface TabProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
  width?: string;
  height?: string;
  backgroundColor?: CSSHexColor;
  underbarColor?: CSSHexColor;
}

const Tab = ({
  tabs,
  activeTab,
  onTabChange,
  width = "100%",
  backgroundColor = bgColors[222222],
  underbarColor = basicColors.white,
}: TabProps) => {
  return (
    <Wrapper $backgroundColor={backgroundColor} $width={width}>
      <TabsContainer>
        {tabs.map((tab, index) => (
          <TabButton
            key={index}
            $isActive={index === activeTab}
            onClick={() => onTabChange(index)}
          >
            {tab}
          </TabButton>
        ))}
      </TabsContainer>
      <TabIndicator
        $activeTab={activeTab}
        $numberOfTabs={tabs.length}
        $underbarColor={underbarColor}
      />
    </Wrapper>
  );
};

export default Tab;

type CSSStyledTabProps = {
  $backgroundColor: CSSHexColor;
  $width: string;
};

const Wrapper = styled.div<CSSStyledTabProps>`
  width: ${({ $width }) => $width};
  display: flex;
  flex-direction: column;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

const TabsContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 2px solid ${basicColors.black};
`;

const TabButton = styled.button<{ $isActive: boolean }>`
  width: 100%;
  padding: 10px;
  color: ${({ $isActive }) =>
    $isActive ? basicColors.white : grayColors.panelGray};
  font-family: SpoqaHanSansNeo;
  font-size: 13px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
`;

const TabIndicator = styled.div<{
  $activeTab: number;
  $numberOfTabs: number;
  $underbarColor: CSSHexColor;
}>`
  height: 2px;
  background-color: ${({ $underbarColor }) => $underbarColor};
  width: calc(100% / (${(props) => props.$numberOfTabs}));
  transform: translateX(${(props) => `calc(${props.$activeTab * 100}%)`});
  transition: transform 0.3s;
`;
