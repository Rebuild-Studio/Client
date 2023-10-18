import { observer } from "mobx-react";
import Panel from "../../layout/Panel/Panel";
import Tab from "../../layout/Tab";
import styled from "styled-components";
import HdriSetting from "./sceneSetting/HdriSetting";
import DisplaySetting from "./sceneSetting/DisplaySetting";
import PostEffectSetting from "./sceneSetting/PostEffectSetting";

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

const RightPanelContainer = styled.div`
  height: 100%;
`;
