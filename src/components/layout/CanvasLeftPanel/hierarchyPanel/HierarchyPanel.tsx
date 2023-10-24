import { observer } from "mobx-react";
import Tab from "../../Tab";
import { StyledHeader, StyledPanel, StyledTab } from "../CanvasLeftPanel.style";
import { MeshType } from "@/store/primitiveStore";
import { HierarchyElement } from "./HierarchyElement";
import styled from "styled-components";
import { useState } from "react";
import { toJS } from "mobx";

type Props = {
  meshes: MeshType;
};

export const HierarchyPanel = observer(({ meshes }: Props) => {
  console.log(toJS(meshes))
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (index: number) => {
    //Todo: 인터렉션 에디터 붙으면 if문 지우기(이정우)
    if (index === 0) setActiveTab(index);
  };

  return (
    <StyledPanel>
      <StyledHeader>계층 구조</StyledHeader>
      <StyledTab>
        <Tab
          tabs={["캔버스", "인터렉션 에디터"]}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </StyledTab>
      {activeTab === 0 && (
        <HierarchyList>
          {Object.values(meshes)
            .filter((mesh) => mesh.name !== "SELECTED_GROUP")
            .map((mesh) => (
              <HierarchyElement depth={0} key={mesh.uuid} mesh={mesh} />
            ))}
        </HierarchyList>
      )}
    </StyledPanel>
  );
});

const HierarchyList = styled.div`
  margin-left: 20px;
`;
