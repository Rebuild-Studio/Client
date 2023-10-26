import { observer } from "mobx-react";
import Accordion from "@/components/layout/Accordion";
import Switch from "@/components/buttons/SwitchButton";
import storeContainer from "@/store/storeContainer";
import styled from "styled-components";

const PostEffectSetting = () => {
  const { sceneSettingStore } = storeContainer;

  return (
    <>
      <Accordion title={"명암 고급 효과"}>
        <SwitchWrapper>
          <Switch
            checked={sceneSettingStore.SSAOToggle}
            onChange={sceneSettingStore.setSSAOToggle}
          />
        </SwitchWrapper>
      </Accordion>
      <Accordion title={"반짝임 효과"}>
        <SwitchWrapper>
          <Switch
            checked={sceneSettingStore.bloomToggle}
            onChange={sceneSettingStore.setBloomToggle}
          />
        </SwitchWrapper>
      </Accordion>
    </>
  );
};

const Observer = observer(PostEffectSetting);
export default Observer;

const SwitchWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 0;
`;
