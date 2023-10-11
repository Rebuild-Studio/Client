import { action } from "mobx";
import * as THREE from "three";
import { data_store } from "../../stores/Data_Store";
import { object_store } from "../../stores/Object_Store";
import { hexToHsva, hsvaToHex, rgbaToHex } from "@uiw/color-convert";
import canvasHistory_store from "../../stores/CanvasHistory_Store";
import ChangeMaterialPropsCommands from "../../class/commands/CanvasObject/ChangeMaterialPropsCommands";
import { Material_store } from "../../stores/Material_Store";
import { objectViewModel } from "../Object_VM";
import { rgbaToHsva } from "@uiw/react-color";
const MaterialEditVM = {
  selectedTemplates: 0,
  materialTemplateName: null,

  get materialUuid() {
    //prettier-ignore
    return Object.keys(object_store.selectedObjects[0].materialProps)[0];
  },
  get materialName() {
    return object_store.selectedObjects[0].materialProps[
      MaterialEditVM.materialUuid
    ]["name"];
  },

  get materialProps() {
    return Material_store.materialProps;
  },
  get hsva() {
    return Material_store.hsva;
  },
  initMaterialData: action(() => {
    Material_store.materialProps = [];
    Material_store.hsva = null;
    if (
      object_store.selectedObjects.length !== 0 &&
      typeof object_store.selectedObjects[0].materialProps !== "undefined" &&
      object_store.selectedObjects[0].materialProps !== null
    ) {
      Object.keys(object_store.selectedObjects[0].materialProps).map(
        (uuid, index) => {
          const propByuuid = {
            ...object_store.selectedObjects[0].materialProps[uuid],
          };

          Object.keys(data_store["materialProps"]).map((mprop) => {
            if (mprop === "color") {
              let hsva = hexToHsva(propByuuid[mprop]);
              hsva = { ...hsva, a: propByuuid["material"]["opacity"] };
              if (propByuuid["h"]) hsva.h = propByuuid["h"]; //todo hsva_h 적용
              Material_store.hsva = hsva;
            }
            if (mprop === "side") {
              propByuuid[mprop] = propByuuid[mprop] ? true : false;
            }
            Material_store.materialProps.push([
              data_store["materialProps"][mprop][1],
              data_store["materialProps"][mprop][0],
              propByuuid[mprop],
              mprop,
            ]);
          });
        }
      );
      Material_store.materialProps = [...Material_store.materialProps];
    }
  }),
  currentValue: 0,
  onSliderMouseDown: action((value) => {
    MaterialEditVM.currentValue = value;
  }),
  onSliderMouseUp: action((value, mode) => {
    const prop = mode.split("_")[1];

    canvasHistory_store.execute(
      new ChangeMaterialPropsCommands(
        object_store.selectedObjects[0],
        prop,
        MaterialEditVM.materialUuid,
        MaterialEditVM.currentValue,
        value
      )
    );
  }),
  onChangeHandlerMaterial: action((e, index) => {
    const prop = e.target.name;
    const value = e.target.value;

    //prettier-ignore
    object_store.selectedObjects[0].SetMaterialProps(MaterialEditVM.materialUuid, prop, value);
  }),
  onChangeTwoSide: action((e) => {
    const curValue = e.target.checked ? THREE.FrontSide : THREE.DoubleSide;

    const side = e.target.checked ? THREE.DoubleSide : THREE.FrontSide;
    const newValue = side;

    canvasHistory_store.execute(
      new ChangeMaterialPropsCommands(
        object_store.selectedObjects[0],
        "side",
        MaterialEditVM.materialUuid,
        curValue,
        newValue
      )
    );
  }),
  onChangeHandlerColor: action((phsva) => {
    Material_store.hsva = phsva;

    const hexColor = hsvaToHex(phsva);

    const materialProps =
      object_store.selectedObjects[0].materialProps[
        MaterialEditVM.materialUuid
      ];
    materialProps["h"] = phsva.h;

    if (object_store.selectedObjects[0].mesh.material.uniforms) {
      object_store.selectedObjects[0].mesh.material.uniforms.diffuse.value =
        new THREE.Color(hexColor);
    }

    object_store.selectedObjects[0].SetMaterialProps(
      MaterialEditVM.materialUuid,
      "color",
      hexColor
    );
  }),
  onChangeHandlerAlpha: action((phsva) => {
    object_store.selectedObjects[0].SetMaterialProps(
      MaterialEditVM.materialUuid,
      "opacity",
      phsva.a
    );
  }),
  onChangeInputAlpha: action((phsva) => {
    const newAlpha = phsva.a;
    const curAlpha =
      objectViewModel.selectedObjects[0].materialProps[
        MaterialEditVM.materialUuid
      ]["opacity"];

    canvasHistory_store.execute(
      new ChangeMaterialPropsCommands(
        object_store.selectedObjects[0],
        "opacity",
        MaterialEditVM.materialUuid,
        curAlpha ? curAlpha : 1,
        newAlpha
      )
    );
  }),
  onChangeInputHex: action((hex) => {
    const newHex = hex;
    const hsva = hexToHsva(hex);
    const currentHex =
      objectViewModel.selectedObjects[0].materialProps[
        MaterialEditVM.materialUuid
      ]["color"];

    objectViewModel.selectedObjects[0].materialProps[
      MaterialEditVM.materialUuid
    ]["h"] = hsva.h;
    //prettier-ignore
    canvasHistory_store.execute(
      new ChangeMaterialPropsCommands(
        object_store.selectedObjects[0],
        'color',
        MaterialEditVM.materialUuid,
        currentHex,
        newHex
      )
    );
  }),
  onChangeInputRGB: action((rgb) => {
    const newHex = rgbaToHex(rgb);
    const hsva = rgbaToHsva(rgb);
    const currentHex =
      objectViewModel.selectedObjects[0].materialProps[
        MaterialEditVM.materialUuid
      ]["color"];

    objectViewModel.selectedObjects[0].materialProps[
      MaterialEditVM.materialUuid
    ]["h"] = hsva.h;
    //prettier-ignore
    canvasHistory_store.execute(
      new ChangeMaterialPropsCommands(
        object_store.selectedObjects[0],
        'color',
        MaterialEditVM.materialUuid,
        currentHex,
        newHex
      )
    );
  }),
};

export default MaterialEditVM;
