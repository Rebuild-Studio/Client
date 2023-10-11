import { observer } from "mobx-react";
import Accordion from "@/components/layout/Accordion";
const PostEffectSetting = observer(() => {
  return (
    <>
      <Accordion title={"명암 고급 효과"}></Accordion>
      <Accordion title={"반짝임 효과"}></Accordion>
    </>
  );
});

export default PostEffectSetting;
