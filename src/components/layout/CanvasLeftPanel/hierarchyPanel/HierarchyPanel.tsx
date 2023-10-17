import { observer } from "mobx-react";
import styled from "styled-components";
import { MeshType } from "@store/primitiveStore";
import { basicColors, bgColors } from "@resources/colors/colors";
import { HierarchyElement } from "./HierarchyElement";
import { Tabs } from "../../Tabs";
import { StyledHeader, StyledPanel, StyledTab } from "../CanvasLeftPanel.style";

type Props = {
  meshes: MeshType;
};

export const HierarchyPanel = observer(({ meshes }: Props) => {
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
      <HierarchyList>
        {Object.values(meshes)
          .filter((mesh) => mesh.name !== "SELECTED_GROUP")
          .map((mesh) => (
            <HierarchyElement depth={0} key={mesh.uuid} mesh={mesh} />
          ))}
      </HierarchyList>
    </StyledPanel>
  );
});

const HierarchyList = styled.div`
  margin-left: 20px;
`;
