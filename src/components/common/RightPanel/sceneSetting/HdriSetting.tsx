import { observer } from "mobx-react";
import storeContainer from "@/store/storeContainer";
import Accordion from "@/components/layout/Accordion";
import Slider from "@/components/common/Slider";

const HdriSetting = observer(() => {
  return (
    <>
      <Accordion
        title={"환경이미지"}
        hasSwitch={true}
        toggle={storeContainer.sceneStore.hdriToggle}
      >
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
          initValue={storeContainer.sceneStore.directionalLightIntensity}
          title={"강도"}
          step={0.1}
        />
      </Accordion>
    </>
  );
});

export default HdriSetting;
