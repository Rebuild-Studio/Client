import ChangeMaterialTextureCommand from "../../class/commands/CanvasObject/ChangeMaterialTextureCommand";
import canvasHistory_store from "../../stores/CanvasHistory_Store";
import { common_store } from "../../stores/Common_Store";
import { data_store } from "../../stores/Data_Store";
import { object_store } from "../../stores/Object_Store";
import { action } from "mobx";
import { objectViewModel } from "../Object_VM";
import * as THREE from "three";
import {
  cartoonShader,
  waveShader,
  cartoonWaveShader,
} from "../../class/Studio/Shader";
const MaterialTemplateVM = {
  selectedTemplates: 0,
  materialTemplateName: null,
  materialProps: null,

  get materialTemplates() {
    return data_store.mat_tex_list;
  },
  get selectedMaterialTemplateName() {
    return MaterialTemplateVM.materialTemplateName;
  },

  initMaterialTemplate() {
    if (object_store.selectedObjects[0]?.materialProps) {
      const materialUuid = Object.keys(
        object_store.selectedObjects[0].materialProps
      )[0];

      const materialProps =
        object_store.selectedObjects[0].materialProps[materialUuid];

      MaterialTemplateVM.materialTemplateName =
        MaterialTemplateVM.IsMaterialTemplate(materialProps.materTemp)
          ? materialProps.materTemp
          : data_store.mat_tex_list[0][1];
    } else return;
  },
  IsMaterialTemplate(materialTemplateName) {
    for (const matTexture of data_store.mat_tex_list) {
      if (matTexture[1] === materialTemplateName) return true;
    }
    return false;
  },
  OnClickMaterialTemplate: action(async (e) => {
    const index = e.currentTarget.value;
    const materialUuid = Object.keys(
      object_store.selectedObjects[0].materialProps
    )[0];
    common_store.setIsLoading(true);
    const curMaterial = objectViewModel.GetMaterialByUuid(materialUuid);
    const newMaterial =
      Number(index) === 0
        ? objectViewModel.GetMaterialPropsByUuid(materialUuid)["originMaterial"]
        : await loadersViewModel.GetMaterialTextureByIdx(index);

    canvasHistory_store.execute(
      new ChangeMaterialTextureCommand(
        object_store.selectedObjects[0],
        materialUuid,
        curMaterial,
        newMaterial
      )
    );
    common_store.setIsLoading(false);
  }),

  //temporary shader command
  OnClickCartoonShader: action(async (e) => {
    //const index = e.currentTarget.value;
    const materialUuid = Object.keys(
      object_store.selectedObjects[0].materialProps
    )[0];
    common_store.setIsLoading(true);
    const curMaterial = objectViewModel.GetMaterialByUuid(materialUuid);
    const newMaterial = cartoonShader.clone();

    const prev_map = curMaterial.map;
    const prev_color = curMaterial.color;

    newMaterial.color = prev_color;
    newMaterial.uniforms.diffuse.value = prev_color;
    newMaterial.map = prev_map;
    newMaterial.uniforms.map.value = prev_map;

    //const cartoon = e.target.checked ? newMaterial : curMaterial;
    //const prev = e.target.checked ? curMaterial : newMaterial;

    object_store.selectedObjects[0].mesh.material = e.target.checked
      ? newMaterial
      : curMaterial;
    // canvasHistory_store.execute(
    //   new ChangeMaterialTextureCommand(
    //     object_store.selectedObjects[0],
    //     materialUuid,
    //     cartoon,
    //     prev
    //   )
    // );
    common_store.setIsLoading(false);
  }),

  OnClickWaveShader: action(async (e) => {
    //const index = e.currentTarget.value;
    const materialUuid = Object.keys(
      object_store.selectedObjects[0].materialProps
    )[0];
    common_store.setIsLoading(true);
    const curMaterial = objectViewModel.GetMaterialByUuid(materialUuid);
    const newMaterial = waveShader.clone();

    const prev_map = curMaterial.map;
    const prev_color = curMaterial.color;

    const clock = new THREE.Clock();
    const tick = () => {
      newMaterial.uniforms.uTime.value = clock.getElapsedTime();
      if (e.target.checked) {
        window.requestAnimationFrame(tick);
      }
    };
    tick();

    newMaterial.color = prev_color;
    newMaterial.uniforms.diffuse.value = prev_color;
    newMaterial.map = prev_map;
    newMaterial.uniforms.map.value = prev_map;

    object_store.selectedObjects[0].mesh.material = e.target.checked
      ? newMaterial
      : curMaterial;
    common_store.setIsLoading(false);
  }),

  OnClickCartoonWaveShader: action(async (e) => {
    //const index = e.currentTarget.value;
    const materialUuid = Object.keys(
      object_store.selectedObjects[0].materialProps
    )[0];
    common_store.setIsLoading(true);
    const curMaterial = objectViewModel.GetMaterialByUuid(materialUuid);
    const newMaterial = cartoonWaveShader.clone();

    const prev_map = curMaterial.map;
    const prev_color = curMaterial.color;

    const clock = new THREE.Clock();
    const tick = () => {
      newMaterial.uniforms.uTime.value = clock.getElapsedTime();
      if (e.target.checked) {
        window.requestAnimationFrame(tick);
      }
    };
    tick();

    newMaterial.color = prev_color;
    newMaterial.uniforms.diffuse.value = prev_color;
    newMaterial.map = prev_map;
    newMaterial.uniforms.map.value = prev_map;

    object_store.selectedObjects[0].mesh.material = e.target.checked
      ? newMaterial
      : curMaterial;
    common_store.setIsLoading(false);
  }),
};

export default MaterialTemplateVM;
