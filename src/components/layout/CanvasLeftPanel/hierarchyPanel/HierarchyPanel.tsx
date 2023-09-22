import { basicColors, bgColors } from "@/resources/colors/colors";

import { observer } from "mobx-react";
import { Tabs } from "../../Tabs";
import {
  StyledContent,
  StyledHeader,
  StyledPanel,
  StyledTab,
} from "../CanvasLeftPanel.style";

type Props = {};

export const HierarchyPanel = observer((props: Props) => {
  return (
    <StyledPanel>
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
    </StyledPanel>
  );
});
