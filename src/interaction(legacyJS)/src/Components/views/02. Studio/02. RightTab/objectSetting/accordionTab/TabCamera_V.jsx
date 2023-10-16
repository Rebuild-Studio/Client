import { Box } from "@mui/material";
import { observer } from "mobx-react";
import MxSlider from "../../gui/Slider_V";
import CameraEditVM from "../../../../../view_models/06. ObjectEdit/CameraEdit_VM";
import { objectViewModel } from "../../../../../view_models/Object_VM";

const TabCamera = observer((props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 2,
      }}
    >
      {CameraEditVM.cameraPropsList.map((prop, index) => {
        return (
          <MxSlider
            key={index}
            label={prop[1]}
            value={objectViewModel.selectedObjects[0].props[prop[0]]}
            onChange={(e) => CameraEditVM.onChangeHandlerCameraProp(e, prop[0])}
            min={prop[3]}
            max={prop[4]}
            step={prop[5]}
            undoMode={"Camera_" + prop[0]}
            onMouseDown={CameraEditVM.onSliderMouseDown}
            onMouseUp={CameraEditVM.onSliderMouseUp}
          />
        );
      })}
    </Box>
  );
});

export default TabCamera;
