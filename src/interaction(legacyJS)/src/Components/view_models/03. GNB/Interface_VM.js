import { action } from "mobx";
import { scene_store } from "../../stores/Scene_Store";

const InterfaceSettingVM = {
  currentBackgroundColor: scene_store.canvasBackgroundColor,
  get canvasBackgroundColor() {
    return scene_store.canvasBackgroundColor;
  },
  setCanvasBackgroundColor: action((value) => {
    scene_store.canvasBackgroundColor = value;
  }),
  onChangeCanvasBackgroundColor: action((hsvaColor) => {
    scene_store.canvasBackgroundColor = hsvaColor;
  }),
  onInitCanvasBackgroundColor: action(() => {
    scene_store.canvasBackgroundColor = scene_store.initCanvasBackgroundColor;
  }),
  RevertSetting: action(() => {
    scene_store.canvasBackgroundColor =
      InterfaceSettingVM.currentBackgroundColor;
  }),
  onClickHandler: action(() => {
    InterfaceSettingVM.currentBackgroundColor =
      scene_store.canvasBackgroundColor;
  }),
};
export { InterfaceSettingVM };
