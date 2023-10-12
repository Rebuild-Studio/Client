import { observer } from "mobx-react";
import Accordion from "@/components/layout/Accordion";
import Switch from "@/components/buttons/SwitchButton";
import storeContainer from "@/store/storeContainer";

const PostEffectSetting = observer(() => {
  const { sceneStore } = storeContainer;

  return (
    <>
      <Accordion title={"명암 고급 효과"}>
        <Switch
          label={""}
          checked={sceneStore.SSAOToggle}
          onChange={sceneStore.setSSAOToggle}
        />
      </Accordion>
      <Accordion title={"반짝임 효과"}>
        <Switch
          label={""}
          checked={sceneStore.bloomToggle}
          onChange={sceneStore.setBloomToggle}
        />
      </Accordion>
    </>
  );
});

export default PostEffectSetting;
