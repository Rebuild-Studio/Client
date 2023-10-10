import { useEffect } from "react";
import { observer } from "mobx-react";
import Panel from "../../layout/Panel/Panel";
import Tab from "../../layout/Tab";
import Accordion from "@/components/layout/Accordion";
import styled from "styled-components";

const RightPanelContainer = styled.div`
  position: relative;
  background-color: #282828;
  display: flex;
  height: calc(100vh - ${93}px);
  flex-direction: column;
  align-items: flex-end;
`;

const SceneSettingPanel = observer(() => {
  useEffect(() => {
    console.log("눌렸나?");
  }, []);

  return (
    <RightPanelContainer>
      <Panel label={"씬(Scene) 설정"} options={undefined}>
        <Tab
          tabs={["환경광", "디스플레이", "포스트 효과"]}
          tabContents={[
            <>
              <Accordion title={"환경이미지"}></Accordion>
              <Accordion title={"주변광"}></Accordion>
              <Accordion title={"직사광"}></Accordion>
            </>,
            <>
              <Accordion title={"배경컬러"}></Accordion>
              <Accordion title={"그리드"}></Accordion>
            </>,
            <>
              <Accordion title={"명암 고급 효과"}></Accordion>
              <Accordion title={"반짝임 효과"}></Accordion>
            </>,
          ]}
        />
      </Panel>
    </RightPanelContainer>
  );
});

export default SceneSettingPanel;
