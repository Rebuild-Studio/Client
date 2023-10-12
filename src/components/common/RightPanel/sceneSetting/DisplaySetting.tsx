import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import Accordion from "@/components/layout/Accordion";
import Switch from "@/components/buttons/SwitchButton";
import ColorPicker from "@/components/common/RightPanel/ColorPicker";
import { HsvaColor } from "@uiw/color-convert";
import storeContainer from "@/store/storeContainer";
import ColorHandler from "@/components/common/RightPanel/ColorHandler";

const TitleWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
`;

const DisplaySetting = observer(() => {
  const { updateCanvasBackgroundColor, updateCanvasBackgroundAlpha } =
    ColorHandler;
  const { sceneSettingStore } = storeContainer;
  const [color, setColor] = useState<HsvaColor>(
    sceneSettingStore.canvasBackgroundColor
  );

  useEffect(() => {
    setColor(sceneSettingStore.canvasBackgroundColor);
  }, [sceneSettingStore.canvasBackgroundColor]);

  return (
    <>
      <Accordion title={"배경 컬러"}>
        <TitleWrapper>
          <span>{"배경 컬러"}</span>
          <ColorPicker
            label={"컬러"}
            color={color}
            onChangeHsv={updateCanvasBackgroundColor}
            onChangeA={updateCanvasBackgroundAlpha}
          />
        </TitleWrapper>
      </Accordion>

      <Accordion title={"그리드"}>
        <Switch
          label={"사각형 그리드"}
          checked={sceneSettingStore.isGridVisible}
          onChange={sceneSettingStore.setIsGridVisible}
        />
        <Switch
          label={"중심선 그리드"}
          checked={sceneSettingStore.isAxisVisible}
          onChange={sceneSettingStore.setIsAxisVisible}
        />
      </Accordion>
    </>
  );
});

export default DisplaySetting;
