import { action } from "mobx";
import { data_store } from "../../stores/Data_Store";
import { object_store } from "../../stores/Object_Store";
import canvasHistory_store from "../../stores/CanvasHistory_Store";
import ChangePropsSliderCommand from "../../class/commands/CanvasObject/ChangePropsSliderCommand";
const CameraEditVM = {
  get cameraPropsList() {
    return data_store.cameraProps;
  },

  currentValue: 0,
  onSliderMouseDown: action((value) => {
    CameraEditVM.currentValue = value;
  }),
  onSliderMouseUp: action((value, mode) => {
    const prop = mode.split("_")[1];

    canvasHistory_store.execute(
      new ChangePropsSliderCommand(
        object_store.selectedObjects[0],
        mode,
        prop,
        CameraEditVM.currentValue,
        value
      )
    );
  }),
  onChangeHandlerCameraProp: action((e, prop) => {
    object_store.selectedObjects[0].SetProps(prop, e.target.value);
  }),
};

export default CameraEditVM;
