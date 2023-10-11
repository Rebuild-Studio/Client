import { common_store } from "../../stores/Common_Store";
import { objectViewModel } from "../../view_models/Object_VM";
import * as THREE from "three";
import { runInAction } from "mobx";
import { scene_store } from "../../stores/Scene_Store";
import { controllerBar_store } from "../../stores/ControllerBar_Store";
import { object_store } from "../../stores/Object_Store";

const HotKeyFunctionsAboutViewViewModel = {
  preview: () => {
    const button = document.getElementById("preview");
    button.click();
  },
  fullScreen: () => {
    var max = new THREE.Vector3();
    var min = new THREE.Vector3();
    for (var i = 0; i < object_store.metaObjects.length; i++) {
      object_store.metaObjects[i].setBbox();
      max.x = Math.max(max.x, object_store.metaObjects[i].bbox.max.x);
      min.x = Math.min(min.x, object_store.metaObjects[i].bbox.min.x);
      max.y = Math.max(max.y, object_store.metaObjects[i].bbox.max.y);
      min.y = Math.min(min.y, object_store.metaObjects[i].bbox.min.y);
      max.z = Math.max(max.z, object_store.metaObjects[i].bbox.max.z);
      min.z = Math.min(min.z, object_store.metaObjects[i].bbox.min.z);
    }
    renderingContext_store.camera.position.copy(
      max.clone().add(min.clone()).divideScalar(2)
    );
    renderingContext_store.camera.translateOnAxis(
      new THREE.Vector3(0, 0, 1),
      Math.max((max.x - min.x) / 3, max.y - min.y, max.z - min.z) * 2.5
    );
    //set orbitcontrol target
    common_store.orbitcontrol.target = max
      .clone()
      .add(min.clone())
      .divideScalar(2);
  },
  objEnlarge: () => {
    if (!common_store.isPreview && common_store.curCategory === "canvas") {
      if (objectViewModel.selectedObjects.length === 0) {
        HotKeyFunctionsAboutViewViewModel.fullScreen();
      } else if (objectViewModel.selectedObjects.length === 1) {
        //set selected object current bounding box
        objectViewModel.selectedObjects[0].setBbox();
        //set camera position
        renderingContext_store.camera.position.copy(
          objectViewModel.selectedObjects[0].getBboxCenter()
        );
        renderingContext_store.camera.translateOnAxis(
          new THREE.Vector3(0, 0, 1),
          Math.max(
            (objectViewModel.selectedObjects[0].bbox.max.x -
              objectViewModel.selectedObjects[0].bbox.min.x) /
              3,
            objectViewModel.selectedObjects[0].bbox.max.y -
              objectViewModel.selectedObjects[0].bbox.min.y,
            objectViewModel.selectedObjects[0].bbox.max.z -
              objectViewModel.selectedObjects[0].bbox.min.z
          ) * 2.5
        );
        //set orbitcontrol target
        common_store.orbitcontrol.target =
          objectViewModel.selectedObjects[0].getBboxCenter();
      } else if (objectViewModel.selectedObjects.length > 1) {
        var max = new THREE.Vector3();
        var min = new THREE.Vector3();
        for (var i = 0; i < objectViewModel.selectedObjects.length; i++) {
          objectViewModel.selectedObjects[i].setBbox();
          max.x = Math.max(
            max.x,
            objectViewModel.selectedObjects[i].bbox.max.x
          );
          min.x = Math.min(
            min.x,
            objectViewModel.selectedObjects[i].bbox.min.x
          );
          max.y = Math.max(
            max.y,
            objectViewModel.selectedObjects[i].bbox.max.y
          );
          min.y = Math.min(
            min.y,
            objectViewModel.selectedObjects[i].bbox.min.y
          );
          max.z = Math.max(
            max.z,
            objectViewModel.selectedObjects[i].bbox.max.z
          );
          min.z = Math.min(
            min.z,
            objectViewModel.selectedObjects[i].bbox.min.z
          );
        }
        renderingContext_store.camera.position.copy(
          max.clone().add(min.clone()).divideScalar(2)
        );
        renderingContext_store.camera.translateOnAxis(
          new THREE.Vector3(0, 0, 1),
          Math.max((max.x - min.x) / 3, max.y - min.y, max.z - min.z) * 2.5
        );
        //set orbitcontrol target
        common_store.orbitcontrol.target = max
          .clone()
          .add(min.clone())
          .divideScalar(2);
      }
    }
  },

  openHistoryTab: () => {
    console.log();
    if (!common_store.isPreview && common_store.curCategory === "canvas") {
      if (common_store.optionLeftTab !== "history") {
        common_store.changeLeftOption("history");
      } else {
        common_store.changePrevLeftOption("history");
        common_store.changeLeftOption("");
      }
    }
  },

  openHierarchyTab: () => {
    if (!common_store.isPreview && common_store.curCategory === "canvas") {
      if (common_store.optionLeftTab !== "hierarchy") {
        common_store.changeLeftOption("hierarchy");
      } else {
        common_store.changePrevLeftOption("hierarchy");
        common_store.changeLeftOption("");
      }
    }
  },

  moveModeOn: () => {
    if (
      !common_store.isPreview &&
      !common_store.isMoveMode &&
      common_store.curCategory === "canvas"
    ) {
      common_store.setIsMoveMode(true);
      if (objectViewModel.isObjectSelected) {
        object_store.prevPosition.copy(
          object_store.selectedObjects[0].mesh.position.clone()
        );
        object_store.prevRotation.copy(
          object_store.selectedObjects[0].mesh.rotation.clone()
        );
        object_store.selectedObjects[0].RemoveFromCollisionArray();
      }
    }
  },

  normalSnapToggle: () => {
    if (!common_store.isPreview && common_store.curCategory === "canvas") {
      controllerBar_store.setNormalMode(!controllerBar_store.normalMode);
    }
  },

  moveModeOff: () => {
    if (common_store.isMoveMode && common_store.curCategory === "canvas") {
      if (objectViewModel.isObjectSelected) {
        object_store.selectedObjects[0].mesh.position.copy(
          object_store.prevPosition
        );
        object_store.selectedObjects[0].mesh.rotation.copy(
          object_store.prevRotation
        );
        objectViewModel.selectedObjects[0].AddMeshToRaycasterArray();
      }
    }
    common_store.setIsMoveMode(false);
    common_store.orbitcontrol.enabled = true;
  },

  async save() {
    if (componentViewModel.unveiledComponentName.length === 0) {
      runInAction(() => {
        common_store.openSaveMenu = true;
      });
    } else {
    }
  },

  gridToggle: () => {
    if (!common_store.isPreview && common_store.curCategory === "canvas") {
      scene_store.grid.visible = !scene_store.grid.visible;
    }
  },
};

export { HotKeyFunctionsAboutViewViewModel };
