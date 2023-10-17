import { action } from "mobx";
import { data_store } from "../../stores/Data_Store";
import { object_store } from "../../stores/Object_Store";
import canvasHistory_store from "../../stores/CanvasHistory_Store";
import ChangePropsSliderCommand from "../../class/commands/CanvasObject/ChangePropsSliderCommand";
import { objectViewModel } from "../Object_VM";
import {
  hsvaToHex,
  hexToHsva,
  rgbaToHsva,
  rgbaToHex,
} from "@uiw/color-convert";
import ChangeLightPropsCommands from "../../class/commands/CanvasObject/ChangeLightPropsCommands";
const LightEditVM = {
  get lightPropsList() {
    const processData = [...data_store.lightProps["common"]];
    const lightType = objectViewModel.selectedObjects[0].props["lightType"];
    if (data_store.lightProps[lightType]) {
      processData.push(...data_store.lightProps[lightType]);
    }

    return processData;
  },
  currentValue: 0,
  onSliderMouseDown: action((value) => {
    LightEditVM.currentValue = value;
  }),
  onSliderMouseUp: action((value, mode) => {
    const prop = mode.split("_")[1];

    canvasHistory_store.execute(
      new ChangePropsSliderCommand(
        object_store.selectedObjects[0],
        mode,
        prop,
        LightEditVM.currentValue,
        value
      )
    );
  }),
  onChangeHandlerLightProp: action((e, prop) => {
    object_store.selectedObjects[0].SetProps(prop, e.target.value);
  }),
  onChangeHandlerLightColor: action((phsva) => {
    const hexColor = hsvaToHex(phsva);

    object_store.selectedObjects[0].props["h"] = phsva.h;

    object_store.selectedObjects[0].SetProps("color", hexColor);
  }),

  onChangeInputHex: action((hex) => {
    const newHex = hex;
    const hsva = hexToHsva(hex);
    const currentHex = objectViewModel.selectedObjects[0].props["color"];

    objectViewModel.selectedObjects[0].props["h"] = hsva.h;
    //prettier-ignore
    canvasHistory_store.execute(
      new ChangeLightPropsCommands(
        object_store.selectedObjects[0],
        'color',
        currentHex,
        newHex
      )
    );
  }),
  onChangeInputRGB: action((rgb) => {
    const newHex = rgbaToHex(rgb);
    const hsva = rgbaToHsva(rgb);
    const currentHex = objectViewModel.selectedObjects[0].props["color"];

    objectViewModel.selectedObjects[0].props["h"] = hsva.h;
    //prettier-ignore
    canvasHistory_store.execute(
      new ChangeLightPropsCommands(
        object_store.selectedObjects[0],
        'color',
        currentHex,
        newHex
      )
    );
  }),
};

export default LightEditVM;
