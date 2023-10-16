import { action } from "mobx";
import { data_store } from "../../stores/Data_Store";
import { object_store } from "../../stores/Object_Store";
import canvasHistory_store from "../../stores/CanvasHistory_Store";
import ChangePropsSliderCommand from "../../class/commands/CanvasObject/ChangePropsSliderCommand";
import ShapeOpenEndedToggleOnCommand from "../../class/commands/CanvasObject/ShapeOpenEndedToggleOnCommand";
import ShapeOpenEndedToggleOffCommand from "../../class/commands/CanvasObject/ShapeOpenEndedToggleOffCommand";

const ShapeEditVM = {
  get geoParamsList() {
    const object = object_store.selectedObjects[0];
    return data_store[object.geometry.shape];
  },

  currentValue: 0,
  onSliderMouseDown: action((value) => {
    ShapeEditVM.currentValue = value;
  }),
  onSliderMouseUp: action((value, mode) => {
    const prop = mode.split("_")[1];

    canvasHistory_store.execute(
      new ChangePropsSliderCommand(
        object_store.selectedObjects[0],
        mode,
        prop,
        ShapeEditVM.currentValue,
        value
      )
    );
  }),
  onChangeHandlerShape: action((e, prop) => {
    object_store.selectedObjects[0].SetProps(prop, e.target.value);
  }),
  onChangeSwitchShape: action((e, prop) => {
    const curValue = e.target.checked;
    const newValue = !e.target.checked;
    ShapeOpenEndedToggleOnCommand;
    if (curValue) {
      canvasHistory_store.execute(
        new ShapeOpenEndedToggleOnCommand(object_store.selectedObjects[0])
      );
    } else {
      canvasHistory_store.execute(
        new ShapeOpenEndedToggleOffCommand(object_store.selectedObjects[0])
      );
    }
  }),
};

export default ShapeEditVM;
