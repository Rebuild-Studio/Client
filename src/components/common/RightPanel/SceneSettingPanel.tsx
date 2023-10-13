import { observer } from "mobx-react";
import Panel from "../../layout/Panel/Panel";
import Tab from "../../layout/Tab";
import styled from "styled-components";
import HdriSetting from "./sceneSetting/HdriSetting";
import DisplaySetting from "./sceneSetting/DisplaySetting";
import PostEffectSetting from "./sceneSetting/PostEffectSetting";

const RightPanelContainer = styled.div`
  position: relative;
  background-color: #282828;
  display: flex;
  height: calc(100vh - ${93}px);
  flex-direction: column;
  align-items: flex-end;
`;

const SceneSettingPanel = observer(() => {
  return (
    <RightPanelContainer>
      <Panel label={"씬(Scene) 설정"} options={undefined}>
        <Tab
          tabs={["환경광", "디스플레이", "포스트 효과"]}
          tabContents={[
            <HdriSetting />,
            <DisplaySetting />,
            <PostEffectSetting />,
          ]}
        />
      </Panel>
    </RightPanelContainer>
  );
});

export default SceneSettingPanel;
