import * as THREE from "three";
import { nanoid } from "nanoid";
import canvasHistoryStore from "@store/canvasHistoryStore";
import { MeshType } from "@store/primitiveStore";
import storeContainer from "@store/storeContainer";
import { copyGroup, copyObject } from "./copyObject";
import { renderGroup, renderPrimitive } from "./renderThreeComponents";

const executeContextMenu = (scene: THREE.Scene) => {
  const { projectStateStore, primitiveStore, contextMenuStore } =
    storeContainer;

  switch (contextMenuStore.currentSelectedContextMenu) {
    case "미리보기":
      break;
    case "그리드 숨기기":
      projectStateStore.updateGridVisible("INVISIBLE");
      break;
    case "그리드 표시":
      projectStateStore.updateGridVisible("VISIBLE");
      break;
    case "저장":
      break;
    case "붙여넣기":
      Object.values(projectStateStore.currentCopyPrimitive).forEach((value) => {
        if (value.name === "GROUP") {
          const { storeId, newGroup } = copyGroup(value);
          primitiveStore.addPrimitive(storeId, renderGroup(storeId, newGroup));
        } else {
          const { storeId, newMesh } = copyObject(value);
          primitiveStore.addPrimitive(
            storeId,
            renderPrimitive(storeId, newMesh),
          );
        }
      });
      break;
    case "복사":
      const copyMeshes: MeshType = {};

      Object.values(primitiveStore.selectedPrimitives).forEach((value) => {
        if (value.name === "GROUP") {
          const { storeId, newGroup } = copyGroup(value);
          copyMeshes[storeId] = newGroup;
        } else {
          const { storeId, newMesh } = copyObject(value);
          copyMeshes[storeId] = newMesh;
        }
      });

      projectStateStore.updateCurrentCopyPrimitive(copyMeshes);
      break;
    case "그룹":
      const storeId = nanoid();
      primitiveStore.addPrimitive(storeId, renderGroup(storeId));
      break;
    case "그룹 해제":
      const selectedGroupStoreId = Object.keys(
        primitiveStore.selectedPrimitives,
      )[0];
      const children = primitiveStore.meshes[selectedGroupStoreId].children;

      children.forEach((value) => {
        primitiveStore.updatePrimitive(
          value.userData["storeId"],
          value as THREE.Mesh,
        );
      });

      while (children.length) {
        scene.attach(primitiveStore.meshes[children[0].userData["storeId"]]);
      }

      primitiveStore.removeSelectedPrimitives(selectedGroupStoreId);
      primitiveStore.removePrimitive(selectedGroupStoreId);
      canvasHistoryStore.differUngroup(selectedGroupStoreId);
      break;
    case "잠그기":
      Object.entries(primitiveStore.selectedPrimitives).forEach(
        ([key, value]) => {
          value.userData["isLocked"] = true;

          primitiveStore.updatePrimitive(key, value.clone());
        },
      );
      break;
    case "잠금 해제":
      Object.entries(primitiveStore.selectedPrimitives).forEach(
        ([key, value]) => {
          value.userData["isLocked"] = false;

          primitiveStore.updatePrimitive(key, value.clone());
        },
      );
      break;
    case "숨기기":
      Object.entries(primitiveStore.selectedPrimitives).forEach(
        ([key, value]) => {
          value.visible = false;

          primitiveStore.updatePrimitive(key, value.clone());
        },
      );
      break;
    case "보이기":
      Object.entries(primitiveStore.selectedPrimitives).forEach(
        ([key, value]) => {
          value.visible = true;

          primitiveStore.updatePrimitive(key, value.clone());
        },
      );
      break;
    case "삭제":
      const selectedPrimitives = Object.keys(primitiveStore.selectedPrimitives);

      selectedPrimitives.forEach((key) => {
        scene.remove(primitiveStore.meshes[key]);
        primitiveStore.removePrimitive(key);
      });

      primitiveStore.clearSelectedGroupPrimitive();
      primitiveStore.clearSelectedPrimitives();
      canvasHistoryStore.differDelete(selectedPrimitives[0]);
      break;
  }
  contextMenuStore.updateSelectedContextMenu("NONE");
};

export default executeContextMenu;
