import { observer } from "mobx-react";
import Switch from "@components/buttons/SwitchButton";
import Accordion from "@components/layout/Accordion";
import storeContainer from "@store/storeContainer";

const PostEffectSetting = observer(() => {
  const { sceneSettingStore } = storeContainer;

  return (
    <>
      <Accordion title={"명암 고급 효과"}>
        <Switch
          label={""}
          checked={sceneSettingStore.SSAOToggle}
          onChange={sceneSettingStore.setSSAOToggle}
        />
      </Accordion>
      <Accordion title={"반짝임 효과"}>
        <Switch
          label={""}
          checked={sceneSettingStore.bloomToggle}
          onChange={sceneSettingStore.setBloomToggle}
        />
      </Accordion>
    </>
  );
});

export default PostEffectSetting;
