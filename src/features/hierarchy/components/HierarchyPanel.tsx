import { useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import {
  StyledHeader,
  StyledPanel,
  StyledTab
} from '@/components/layout/CanvasLeftPanel/CanvasLeftPanel.style';
import Tab from '@/components/layout/Tab';
import { MeshType } from '@store/primitive.store.ts';
import { HierarchyElement } from './HierarchyElement';
import { clearContextMenuHierarchy } from '../utils/clearMouseEventHierarchy';

type Props = {
  meshes: MeshType;
};

const HierarchyPanel = ({ meshes }: Props) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (index: number) => {
    //Todo: 인터렉션 에디터 붙으면 if문 지우기(이정우)
    if (index === 0) setActiveTab(index);
  };

  return (
    <StyledPanel
      onMouseDown={() => {
        clearContextMenuHierarchy();
      }}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <StyledHeader>계층 구조</StyledHeader>
      <StyledTab>
        <Tab
          tabs={['캔버스', '인터렉션 에디터']}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </StyledTab>
      {activeTab === 0 && (
        <HierarchyList>
          {Object.values(meshes)
            .filter((mesh) => mesh.name !== 'SELECTED_GROUP')
            .map((mesh) => (
              <HierarchyElement depth={0} key={mesh.uuid} mesh={mesh} />
            ))}
        </HierarchyList>
      )}
    </StyledPanel>
  );
};

const HierarchyList = styled.div`
  margin-left: 20px;
`;

const Observer = observer(HierarchyPanel);
export default Observer;
