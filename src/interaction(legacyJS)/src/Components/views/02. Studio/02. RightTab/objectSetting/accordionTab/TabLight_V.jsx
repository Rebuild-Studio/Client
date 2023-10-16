import { Box } from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import MxSlider from "../../gui/Slider_V";
import { objectViewModel } from "../../../../../view_models/Object_VM";
import LightEditVM from "../../../../../view_models/06. ObjectEdit/LightEdit_VM";
import { hexToHsva } from "@uiw/color-convert";
import MxColor from "../../gui/MxColor_V";

const TabLight = observer((props) => {
  const roundSliderValue = (value, unit) => {
    const multiplier = 1 / unit;
    return Math.round(value * multiplier) / multiplier;
  };

  return (
    <Box
      sx={{
        width: "100%",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 1,
      }}
    >
      {LightEditVM.lightPropsList.map((prop, index) => (
        <React.Fragment key={index}>
          {prop[2] === "slider" && (
            <MxSlider
              label={prop[1]}
              value={roundSliderValue(
                objectViewModel.selectedObjects[0].props[prop[0]],
                prop[5]
              )}
              onChange={(e) => LightEditVM.onChangeHandlerLightProp(e, prop[0])}
              min={prop[3]}
              max={prop[4]}
              step={prop[5]}
              undoMode={"Light_" + prop[0]}
              onMouseDown={LightEditVM.onSliderMouseDown}
              onMouseUp={LightEditVM.onSliderMouseUp}
            />
          )}
          {prop[2] === "color" && (
            <MxColor
              label={"light color"}
              alphaSlider={false}
              color={hexToHsva(
                objectViewModel.selectedObjects[0].props[prop[0]]
              )}
              onChange={LightEditVM.onChangeHandlerLightColor}
              onMouseDown={LightEditVM.onSliderMouseDown}
              onMouseUp={LightEditVM.onSliderMouseUp}
              onChangeSliderAlpha={LightEditVM.onChangeHandlerAlpha}
              onChangeInputAlpha={LightEditVM.onChangeInputAlpha}
              onChangeInputHex={LightEditVM.onChangeInputHex}
              onChangeInputRGB={LightEditVM.onChangeInputRGB}
              undoMode={"Light_color"}
            />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
});

export default TabLight;
