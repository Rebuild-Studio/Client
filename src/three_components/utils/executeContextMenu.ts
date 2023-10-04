import storeContainer from "@/store/storeContainer";
import { nanoid } from "nanoid";
import { renderGroup, renderPrimitive } from "./renderThreeComponents";
import { MeshType } from "@/store/primitiveStore";
import * as THREE from "three";

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
          const parent = value.clone();
          const parentStoreId = nanoid();

          parent.userData["storeId"] = parentStoreId;

          parent.traverse((child) => {
            if (child.userData["storeId"] !== parentStoreId) {
              child.userData["storeId"] = nanoid();
            }
          });

          primitiveStore.updatePrimitive(parentStoreId, parent);
          primitiveStore.addPrimitive(
            parentStoreId,
            renderGroup(parentStoreId)
          );
          return;
        }

        const copyMesh = value.clone();
        const pasteStoreId = nanoid();

        copyMesh.userData["storeId"] = pasteStoreId;

        primitiveStore.addPrimitive(
          pasteStoreId,
          renderPrimitive(pasteStoreId, copyMesh)
        );
      });
      break;
    case "복사":
      const copyMeshes: MeshType = {};

      Object.values(primitiveStore.selectedPrimitives).forEach(
        (value, index) => {
          copyMeshes[index] = value;
        }
      );

      projectStateStore.updateCurrentCopyPrimitive(copyMeshes);
      break;
    case "그룹":
      const storeId = nanoid();
      primitiveStore.addPrimitive(storeId, renderGroup(storeId));
      break;
    case "그룹 해제":
      const selectedGroupStoreId = Object.keys(
        primitiveStore.selectedPrimitives
      )[0];
      const children = primitiveStore.meshes[selectedGroupStoreId].children;

      children.forEach((value) => {
        if (value.userData) {
          primitiveStore.updatePrimitive(
            value.userData["storeId"],
            value as THREE.Mesh
          );
        }
      });

      while (children.length) {
        scene.attach(primitiveStore.meshes[children[0].userData["storeId"]]);
      }

      primitiveStore.removeSelectedPrimitives(selectedGroupStoreId);
      primitiveStore.removePrimitive(selectedGroupStoreId);
      break;
    case "잠그기":
      Object.entries(primitiveStore.selectedPrimitives).forEach(
        ([key, value]) => {
          value.userData["isLocked"] = true;

          primitiveStore.updatePrimitive(key, value);
        }
      );
      break;
    case "잠금 해제":
      Object.entries(primitiveStore.selectedPrimitives).forEach(
        ([key, value]) => {
          value.userData["isLocked"] = false;

          primitiveStore.updatePrimitive(key, value);
        }
      );
      break;
    case "숨기기":
      Object.entries(primitiveStore.selectedPrimitives).forEach(
        ([key, value]) => {
          value.visible = false;

          primitiveStore.updatePrimitive(key, value);
        }
      );
      break;
    case "보이기":
      Object.entries(primitiveStore.selectedPrimitives).forEach(
        ([key, value]) => {
          value.visible = true;

          primitiveStore.updatePrimitive(key, value);
        }
      );
      break;
    case "삭제":
      const selectedPrimitives = Object.keys(primitiveStore.selectedPrimitives);

      selectedPrimitives.forEach((key) => {
        primitiveStore.removePrimitive(key);
      });

      primitiveStore.clearSelectedGroupPrimitive();
      primitiveStore.clearSelectedPrimitives();

      break;
  }
  contextMenuStore.updateSelectedContextMenu("NONE");
};

export default executeContextMenu;
