import { useEffect } from "react";
import { observer } from "mobx-react";
import storeContainer from "@/store/storeContainer";
import Panel from "../../layout/Panel/Panel";
import Tab from "../../layout/Tab";
import Accordion from "@/components/layout/Accordion";
import styled from "styled-components";
import Slider from "../Slider";

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
            <>
              <Accordion title={"환경이미지"}>
                <Slider
                  min={0}
                  max={5}
                  initValue={storeContainer.sceneStore.hdriIntensity}
                  title={"환경강도"}
                  step={0.1}
                />
                <Slider
                  initValue={storeContainer.sceneStore.hdriYRotation}
                  title={"회전"}
                  min={-180}
                  max={180}
                  step={0.1}
                />
              </Accordion>
              <Accordion title={"주변광"}>
                <Slider
                  min={0}
                  max={2}
                  initValue={storeContainer.sceneStore.ambientLigitIntensity}
                  title={"강도"}
                  step={0.1}
                />
              </Accordion>
              <Accordion title={"직사광"}>
                <Slider
                  min={0}
                  max={5}
                  initValue={
                    storeContainer.sceneStore.directionalLightIntensity
                  }
                  title={"강도"}
                  step={0.1}
                />
              </Accordion>
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
