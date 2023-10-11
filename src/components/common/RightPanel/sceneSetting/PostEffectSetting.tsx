import { observer } from "mobx-react";
import Accordion from "@/components/layout/Accordion";
import Switch from "@/components/buttons/SwitchButton";
import storeContainer from "@/store/storeContainer";

const PostEffectSetting = observer(() => {
  return (
    <>
      <Accordion title={"명암 고급 효과"}>
        <Switch
          label={""}
          checked={storeContainer.sceneStore.SSAOToggle}
          onChange={storeContainer.sceneStore.setSSAOToggle}
        />
      </Accordion>
      <Accordion title={"반짝임 효과"}>
        <Switch
          label={""}
          checked={storeContainer.sceneStore.bloomToggle}
          onChange={storeContainer.sceneStore.setBloomToggle}
        />
      </Accordion>
    </>
  );
});

export default PostEffectSetting;
