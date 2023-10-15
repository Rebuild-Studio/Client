import React, { useState } from "react";
import styled from "styled-components";
import { basicColors } from "@/resources/colors/colors";

interface TabProps {
  tabs: string[];
  tabContents: React.ReactNode[];
}

const Tab = ({ tabs, tabContents }: TabProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <Wrapper>
      <TabsContainer>
        {tabs.map((tab, index) => (
          <TabButton
            key={index}
            isActive={index === activeTab}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </TabButton>
        ))}
      </TabsContainer>
      <TabIndicator activeTab={activeTab} numberOfTabs={tabs.length} />
      <TabContent>{tabContents[activeTab]}</TabContent>
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

const TabButton = styled.button<{ isActive: boolean }>`
  width: 100%;
  padding: 10px;
  color: ${basicColors.white};
  border: none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
`;

const TabIndicator = styled.div<{ activeTab: number; numberOfTabs: number }>`
  height: 2px;
  background-color: ${basicColors.primary};
  width: calc(100% / (${(props) => props.numberOfTabs}));
  transform: translateX(${(props) => `calc(${props.activeTab * 100}%)`});
  transition: transform 0.3s;
`;

const TabContent = styled.div`
  padding: 10px;
`;
