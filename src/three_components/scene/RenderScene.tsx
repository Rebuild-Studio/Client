import storeContainer from "@/store/storeContainer";
import { useFrame, useThree } from "@react-three/fiber";
import { observer } from "mobx-react";
import { useEffect } from "react";
import onClickSceneEvents from "../utils/onClickSceneEvents";
import { nanoid } from "nanoid";
import SelectedGroup from "../group/SelectedGroup";
import onContextMenuSceneEvents from "../utils/onContextMenuSceneEvents";
import onMouseDownSceneEvents from "../utils/onMouseDownSceneEvents";
import Group from "../group/Group";
import Gizmo from "../gizmo/Gizmo";

const RenderScene = observer(() => {
  const { primitiveStore, mouseEventStore, contextMenuStore } = storeContainer;
  const raycaster = useThree((state) => state.raycaster);
  const scene = useThree((state) => state.scene);
  const selectedPrimitivesLength = Object.keys(
    primitiveStore.selectedPrimitives
  ).length;

  useFrame((state) => {
    const intersectObjects = raycaster.intersectObject(state.scene);
    switch (mouseEventStore.currentMouseEvent[0]) {
      case "onMouseDown": {
        onMouseDownSceneEvents();
        break;
      }
      case "onMouseMove": {
        break;
      }
      case "onMouseUp": {
        break;
      }
      case "onClick": {
        onClickSceneEvents(intersectObjects);
        break;
      }
      case "onContextMenu": {
        onContextMenuSceneEvents(intersectObjects);
        break;
      }
      default: {
      }
    }
  });

  useEffect(() => {
    // 선택 컴포넌트 그룹화 작업
    if (selectedPrimitivesLength > 1) {
      primitiveStore.clearSelectedGroupPrimitive();
      const storeId = nanoid();
      primitiveStore.addSelectedGroupPrimitive(
        storeId,
        <SelectedGroup storeId={storeId} />
      );
    }
  }, [selectedPrimitivesLength]);

  // custom hook으로 빼야함
  useEffect(() => {
    switch (contextMenuStore.currentSelectedContextMenu) {
      case "NONE":
        break;
      case "미리보기":
        break;
      case "그리드 숨기기":
        break;
      case "그리드 표시":
        break;
      case "저장":
        break;
      case "붙여넣기":
        break;
      case "복사":
        break;
      case "그룹":
        const storeId = nanoid();
        primitiveStore.addPrimitive(storeId, <Group storeId={storeId} />);
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
        contextMenuStore.updateSelectedContextMenu("NONE");
        break;
      case "잠그기":
        break;
      case "잠금 해제":
        break;
      case "숨기기":
        break;
      case "보이기":
        break;
      case "삭제":
        break;
      case "DIVIDER":
        break;
    }
  }, [contextMenuStore.currentSelectedContextMenu]);

  return (
    <>
      {Object.keys(primitiveStore.selectedPrimitives).length < 2 && (
        <Gizmo storeId={Object.keys(primitiveStore.selectedPrimitives)[0]} />
      )}
      {Object.entries(primitiveStore.primitives).map(([id, primitive]) => {
        primitive.key = id;

        return primitive;
      })}
      {primitiveStore.selectedGroupPrimitive}
    </>
  );
});

export default RenderScene;
