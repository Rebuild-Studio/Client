import { observer } from "mobx-react";
import Accordion from "@/components/layout/Accordion";
import Switch from "@/components/buttons/SwitchButton";

const PostEffectSetting = observer(() => {
  return (
    <>
      <Accordion title={"명암 고급 효과"}>
        <Switch label={""} />
      </Accordion>
      <Accordion title={"반짝임 효과"}>
        <Switch label={""} />
      </Accordion>
    </>
  );
});

export default PostEffectSetting;
