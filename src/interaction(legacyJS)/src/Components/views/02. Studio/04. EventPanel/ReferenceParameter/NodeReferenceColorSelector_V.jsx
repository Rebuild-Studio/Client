import { Tooltip } from "@mui/material";
import { observer } from "mobx-react";
import MxColor from "../../02. RightTab/gui/MxColor_V";
import { eventSystem_store } from "../../../../stores/Interaction_Stores"
import { hexToHsva, rgbaToHsva } from "@uiw/color-convert";
import { useState } from "react";

const NodeReferenceColorSelector = ({ value, setValue, tooltipMessage }) => {
  const [tempColor, setTempColor] = useState(value);
  const handleInputChange = (convertFunction) => (rgb) => {
    setValue(convertFunction(rgb));
  };
  const handleMouseUp = () => {
    setValue(tempColor);
  };

  return (
    <>
      <Tooltip
        componentsProps={style.tooltipAndArrow()}
        arrow
        disableInteractive
        placement="top"
        title={tooltipMessage}
      >
        <div style={style.ColorSelectorButton(eventSystem_store.cameraZoom)}>
          <MxColor
            label=""
            color={tempColor}
            onChange={setTempColor}
            onChangeSliderAlpha={setTempColor}
            onChangeInputAlpha={setValue}
            onChangeInputHex={handleInputChange(hexToHsva)}
            onChangeInputRGB={handleInputChange(rgbaToHsva)}
            onMouseUp={handleMouseUp}
            menuStyle={{ left: -400 }}
            buttonStyle={style.ColorSelectorButton(eventSystem_store.cameraZoom, value)}
          />
        </div>
      </Tooltip>
    </>
  )
};

export default observer(NodeReferenceColorSelector);


const style = {
  ColorSelectorButton: (unit) => ({
    width: `${24 * unit}px`,
    height: `${24 * unit}px`,
    minWidth: 0,
    minHeight: 0,
    alignSelf: "center",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  }),

  tooltip: {
    color: "#e1f853",
    bgcolor: "#282828CC",
    border: "1px solid grey",
    borderRadius: 3,
    bottom: "5px !important",
  },
  arrow: {
    "&::before": {
      backgroundColor: "#282828CC",
      border: "1px solid grey",
    },
  },
  tooltipAndArrow: function () {
    return {
      tooltip: {
        sx: style.tooltip,
      },
      arrow: {
        sx: style.arrow,
      },
    };
  },
}