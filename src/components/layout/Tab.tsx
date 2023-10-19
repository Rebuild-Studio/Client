import styled from "styled-components";
import { basicColors, grayColors } from "@/resources/colors/colors";

interface TabProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

const Tab = ({ tabs, activeTab, onTabChange }: TabProps) => {
  return (
    <Wrapper>
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
      <TabIndicator $activeTab={activeTab} $numberOfTabs={tabs.length} />
    </Wrapper>
  );
};

export default Tab;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TabsContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 2px solid ${basicColors.black};
`;

const TabButton = styled.button<{ $isActive: boolean }>`
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

const TabIndicator = styled.div<{ $activeTab: number; $numberOfTabs: number }>`
const TabIndicator = styled.div<{ $activeTab: number; $numberOfTabs: number }>`
  height: 2px;
  background-color: ${basicColors.white};
  width: calc(100% / (${(props) => props.$numberOfTabs}));
  transform: translateX(${(props) => `calc(${props.$activeTab * 100}%)`});
  transition: transform 0.3s;
`;
