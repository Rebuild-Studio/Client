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
import canvasHistoryStore from "@/store/canvasHistoryStore";
import { MeshType } from "@/store/primitiveStore";
import CubePrimitive from "../primitives/CubePrimitive";
import TorusPrimitive from "../primitives/TorusPrimitive";
import SpherePrimitive from "../primitives/SpherePrimitive";
import CylinderPrimitive from "../primitives/CylinderPrimitive";
import ConePrimitive from "../primitives/ConePrimitive";
import CapsulePrimitive from "../primitives/CapsulePrimitive";

const RenderScene = observer(() => {
  const {
    primitiveStore,
    mouseEventStore,
    contextMenuStore,
    projectStateStore,
  } = storeContainer;
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

  useEffect(() => {
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
        Object.values(projectStateStore.currentCopyPrimitive).forEach(
          (value) => {
            const copyMesh = value.clone();
            const pasteStoreId = nanoid();
            copyMesh.userData["storeId"] = pasteStoreId;

            primitiveStore.addPrimitive(
              pasteStoreId,
              renderPrimitive(pasteStoreId, copyMesh)
            );
          }
        );
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
        const selectedPrimitives = Object.keys(
          primitiveStore.selectedPrimitives
        );

        selectedPrimitives.forEach((key) => {
          primitiveStore.removePrimitive(key);
        });

        primitiveStore.clearSelectedGroupPrimitive();
        primitiveStore.clearTempPrimitives();
        primitiveStore.clearSelectedPrimitives();

        break;
    }
    contextMenuStore.updateSelectedContextMenu("NONE");
  }, [contextMenuStore.currentSelectedContextMenu]);

  return (
    <>
      <Gizmo storeId={Object.keys(primitiveStore.selectedPrimitives)[0]} />

      {Object.entries(primitiveStore.primitives).map(([id, primitive]) => {
        primitive.key = id;

        return primitive;
      })}
      {primitiveStore.selectedGroupPrimitive[1]}
    </>
  );
});

const renderPrimitive = (storeId: string, mesh: THREE.Mesh) => {
  switch (mesh.geometry.type) {
    case "CapsuleGeometry": {
      return <CapsulePrimitive storeId={storeId} propMesh={mesh} />;
    }
    case "ConeGeometry": {
      return <ConePrimitive storeId={storeId} propMesh={mesh} />;
    }
    case "CylinderGeometry": {
      return <CylinderPrimitive storeId={storeId} propMesh={mesh} />;
    }
    case "SphereGeometry": {
      return <SpherePrimitive storeId={storeId} propMesh={mesh} />;
    }
    case "TorusGeometry": {
      return <TorusPrimitive storeId={storeId} propMesh={mesh} />;
    }
    default: {
      return <CubePrimitive storeId={storeId} propMesh={mesh} />;
    }
  }
};

export default RenderScene;
