import { basicColors, bgColors } from "@/resources/colors/colors";
import { styled } from "styled-components";

import { observer } from "mobx-react";
import { Tabs } from "../../Tabs";
import { fonts } from "@/resources/fonts/font";

type Props = {};

const StyledLeftPanel = styled.div`
  width: 285px;
  height: calc(100vh - 250px);
  background-color: ${bgColors[222222]};
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const StyledHeader = styled.div`
  color: ${basicColors.white};
  padding: 18px;
  font-size: ${fonts.medium};
`;

const StyledTab = styled.div`
  color: ${basicColors.white};
  padding-right: 30px;
  padding-bottom: 20px;
`;

const StyledContent = styled.div``;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 11px;
  color: ${basicColors.white};
  padding: 10px 11px;
`;

export const HierarchyPanel = observer((props: Props) => {
  return (
    <StyledLeftPanel>
      <StyledHeader>계층 구조</StyledHeader>
      <StyledTab>
        <Tabs
          labelList={["캔버스", "인터렉션 에디터"]}
          width="100%"
          height="30px"
          backgroundColor={bgColors[222222]}
          selectedColor={basicColors.white}
          underbarColor={basicColors.white}
        />
      </StyledTab>
      <StyledContent></StyledContent>
    </StyledLeftPanel>
  );
});
