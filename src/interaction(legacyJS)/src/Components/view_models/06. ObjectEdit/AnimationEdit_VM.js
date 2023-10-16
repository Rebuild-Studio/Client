import { action } from "mobx";
import { object_store } from "../../stores/Object_Store";
import canvasHistory_store from "../../stores/CanvasHistory_Store";
import ChangePropsSliderCommand from "../../class/commands/CanvasObject/ChangePropsSliderCommand";
import AnimationToggleOffCommand from "../../class/commands/CanvasObject/AnimationToggleOffCommand";
import AnimationToggleOnCommand from "../../class/commands/CanvasObject/AnimationToggleOnCommand";
const AnimationEditVM = {
  get animationList() {
    return object_store.selectedObjects[0].animationList;
  },

  currentanimationSpeed: {},
  onSliderSpeedMouseDown: action((value, name) => {
    AnimationEditVM.currentanimationSpeed = { name: name, value: value };
  }),
  onSliderSpeedMouseUp: action((value, mode, name) => {
    const newAnimationSpeed = { name: name, value: value };
    canvasHistory_store.execute(
      new ChangePropsSliderCommand(
        object_store.selectedObjects[0],
        mode,
        mode,
        AnimationEditVM.currentanimationSpeed,
        newAnimationSpeed
      )
    );
  }),
  onChangeAniSpeed: action((e, name) => {
    const data = { name: name, value: e.target.value };
    object_store.selectedObjects[0].SetProps("AnimationSpeed", data);
  }),
  onChangeAnimation: action((e, index) => {
    const curplayAniIndex =
      object_store.selectedObjects[0].GetCurrentAnimation();

    const curName =
      object_store.selectedObjects[0].GetCurrentAnimationPropsByIndex(
        curplayAniIndex,
        "name"
      );
    const curWeight =
      object_store.selectedObjects[0].GetCurrentAnimationPropsByIndex(
        curplayAniIndex,
        "weight"
      );

    const curValue = {
      name: curName,
      weight: curWeight,
    };
    const newName =
      object_store.selectedObjects[0].GetCurrentAnimationPropsByIndex(
        index,
        "name"
      );
    const newWeight =
      object_store.selectedObjects[0].GetCurrentAnimationPropsByIndex(
        index,
        "weight"
      );
    const newValue = { name: newName, weight: newWeight };
    if (curName === newName) {
      canvasHistory_store.execute(
        new AnimationToggleOffCommand(
          object_store.selectedObjects[0],
          newName,
          curValue,
          newValue
        )
      );
    } else {
      canvasHistory_store.execute(
        new AnimationToggleOnCommand(
          object_store.selectedObjects[0],
          newName,
          curValue,
          newValue
        )
      );
    }
  }),
  currentGeneralSpeed: 1,
  onSliderGeneralSpeedMouseDown: action((value) => {
    AnimationEditVM.currentGeneralSpeed = value;
  }),
  onSliderGeneralSpeedMouseUp: action((value, mode) => {
    canvasHistory_store.execute(
      new ChangePropsSliderCommand(
        object_store.selectedObjects[0],
        mode,
        mode,
        AnimationEditVM.currentGeneralSpeed,
        value
      )
    );
  }),
  onChangeAniGeneralSpeed: action((e) => {
    object_store.selectedObjects[0].SetProps(
      "AnimationGeneralSpeed",
      e.target.value
    );
  }),
};
export default AnimationEditVM;
