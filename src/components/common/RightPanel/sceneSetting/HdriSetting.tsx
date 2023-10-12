import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import storeContainer from "@/store/storeContainer";
import Accordion from "@/components/layout/Accordion";
import Slider from "@/components/common/Slider";
import CustomMenu from "@/components/layout/Menu";
import Switch from "@/components/buttons/SwitchButton";
import ColorPicker from "@/components/common/RightPanel/ColorPicker";
import { HsvaColor } from "@uiw/color-convert";
import colorHandler from "@/components/common/RightPanel/ColorHandler";
import BackgroundImageTemplate from "./BackgroundImageTemplate";

const TitleWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
`;

const HdriSetting = observer(() => {
  const { sceneSettingStore } = storeContainer;
  const {
    updateAmbientLightColor,
    updateAmbientLightAlpha,
    updateDirectionalLightColor,
    updateDirectionalLightAlpha,
  } = colorHandler;
  const [ambientLightColor, setAmbientLightColor] = useState<HsvaColor>({
    h: 0,
    s: 0,
    v: 0,
    a: 0,
  });
  const [directionalLightColor, setDirectionalLightColor] = useState<HsvaColor>(
    { h: 0, s: 0, v: 0, a: 0 }
  );

  useEffect(() => {
    setAmbientLightColor(sceneSettingStore.ambientLightColor);
  }, [sceneSettingStore.ambientLightColor]);

  useEffect(() => {
    setDirectionalLightColor(sceneSettingStore.directionalLightColor);
  }, [sceneSettingStore.directionalLightColor]);

  return (
    <>
      <Accordion title={"환경이미지"}>
        <Switch
          label={""}
          checked={sceneSettingStore.hdriToggle}
          onChange={sceneSettingStore.setHdriToggle}
        />

        <TitleWrapper>
          <span>{"환경이미지"}</span>
          <CustomMenu
            title={"환경이미지 템플릿"}
            MenuItem={<BackgroundImageTemplate />}
          />
        </TitleWrapper>

        <Slider
          initValue={sceneSettingStore.hdriIntensity}
          onChange={sceneSettingStore.setHdriIntensity}
          min={0}
          max={5}
          title={"환경강도"}
          step={0.1}
        />
        <Slider
          initValue={sceneSettingStore.hdriYRotation}
          onChange={sceneSettingStore.setHdriYRotation}
          title={"회전"}
          min={-180}
          max={180}
          step={0.1}
        />
      </Accordion>
      <Accordion title={"주변광"}>
        <Slider
          initValue={sceneSettingStore.ambientLightIntensity}
          onChange={sceneSettingStore.setAmbientLightIntensity}
          min={0}
          max={2}
          title={"강도"}
          step={0.1}
        />
        <TitleWrapper>
          <span>{"컬러"}</span>
          <ColorPicker
            label={"컬러"}
            color={ambientLightColor}
            onChangeHsv={updateAmbientLightColor}
            onChangeA={updateAmbientLightAlpha}
          />
        </TitleWrapper>
      </Accordion>
      <Accordion title={"직사광"}>
        <Slider
          initValue={sceneSettingStore.directionalLightIntensity}
          onChange={sceneSettingStore.setDirectionalLightIntensity}
          min={0}
          max={5}
          title={"강도"}
          step={0.1}
        />
        <TitleWrapper>
          <span>{"컬러"}</span>
          <ColorPicker
            label={"컬러"}
            color={directionalLightColor}
            onChangeHsv={updateDirectionalLightColor}
            onChangeA={updateDirectionalLightAlpha}
          />
        </TitleWrapper>
      </Accordion>
    </>
  );
});

export default HdriSetting;
