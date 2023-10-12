import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import Accordion from "@/components/layout/Accordion";
import Switch from "@/components/buttons/SwitchButton";
import {
  updateCanvasBackgroundColor,
  updateCanvasBackgroundAlpha,
} from "@/components/common/RightPanel/ColorHandler";
import ColorPicker from "@/components/common/RightPanel/ColorPicker";
import { HsvaColor } from "@uiw/color-convert";
import storeContainer from "@/store/storeContainer";

const TitleWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
`;

const DisplaySetting = observer(() => {
  //white
  const [color, setColor] = useState<HsvaColor>(
    storeContainer.sceneStore.canvasBackgroundColor
  );

  useEffect(() => {
    setColor(storeContainer.sceneStore.canvasBackgroundColor);
  }, [storeContainer.sceneStore.canvasBackgroundColor]);

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
          checked={storeContainer.sceneStore.isGridVisible}
          onChange={storeContainer.sceneStore.setIsGridVisible}
        />
        <Switch
          label={"중심선 그리드"}
          checked={storeContainer.sceneStore.isAxisVisible}
          onChange={storeContainer.sceneStore.setIsAxisVisible}
        />
      </Accordion>
    </>
  );
});

export default DisplaySetting;
