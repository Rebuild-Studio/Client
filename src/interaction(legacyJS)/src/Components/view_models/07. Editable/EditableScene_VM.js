import createUxMetaData from "../../../uxApi/createUxMetaData";
import { scene_store } from "../../stores/Scene_Store";
import { hsvaToRgba } from "@uiw/color-convert";

export default function EditableScene_VM() {
  const toJson = () => {
    const metaDataArray = [
      createUxMetaData(
        "hdriIntensity",
        "number",
        "Spinner",
        [0, 5],
        scene_store.hdriIntensity,
        ""
      ),
      createUxMetaData(
        "canvasBackgroundColor",
        "string",
        "TextField",
        "",
        hsvaToRgba(scene_store.canvasBackgroundColor),
        ""
      ),
      createUxMetaData(
        "canvasBackgroundColorToggle",
        "boolean",
        "Dropdown",
        [true, false],
        scene_store.canvasBackgroundColorToggle,
        true
      ),
      createUxMetaData(
        "ssaoToggle",
        "boolean",
        "Dropdown",
        [true, false],
        scene_store.SSAOToggle,
        false
      ),
      createUxMetaData(
        "bloomToggle",
        "boolean",
        "Dropdown",
        [true, false],
        scene_store.bloomToggle,
        false
      ),
    ];

    return metaDataArray;
  };

  return {
    toJson,
  };
}
