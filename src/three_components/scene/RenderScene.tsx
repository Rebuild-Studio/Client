import storeContainer from "@/store/storeContainer";
import { reaction } from "mobx";
import { useThree } from "@react-three/fiber";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import onClickSceneEvents from "../utils/onClickSceneEvents";
import onContextMenuSceneEvents from "../utils/onContextMenuSceneEvents";
import onMouseDownSceneEvents from "../utils/onMouseDownSceneEvents";
import Gizmo from "../gizmo/Gizmo";
import keyboardSceneEvents from "../utils/keyboardSceneEvents";
import makeSelectedGroup from "../utils/makeSelectedGroup";
import executeContextMenu from "../utils/executeContextMenu";
import onMouseUpSceneEvents from "../utils/onMouseUpSceneEvents";
import * as THREE from "three";
import { useServerMaterialLoader } from "@/hooks/loader";

const RenderScene = observer(() => {
  const {
    primitiveStore,
    mouseEventStore,
    contextMenuStore,
    keyboardEventStore,
    selectedObjectStore,
  } = storeContainer;
  const [newMesh, setNewMesh] = useState(new THREE.Mesh());

  const raycaster = useThree((state) => state.raycaster);
  const scene = useThree((state) => state.scene);

  const selectedPrimitive = Object.values(primitiveStore.selectedPrimitives)[0];
  const materialName = selectedObjectStore.selectedMaterial;
  const material = useServerMaterialLoader(materialName);
  const selectedPrimitivesLength = Object.keys(
    primitiveStore.selectedPrimitives
  ).length;

  useEffect(() => {
    // mouse event
    const dispose = reaction(
      () => {
        return mouseEventStore.currentMouseEvent;
      },
      (mouseEvent) => {
        const intersectObjects = raycaster.intersectObject(scene);
        switch (mouseEvent[0]) {
          case "onMouseDown": {
            onMouseDownSceneEvents();
            break;
          }
          case "onMouseMove": {
            break;
          }
          case "onMouseUp": {
            onMouseUpSceneEvents();
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
      }
    );

    return () => {
      dispose();
    };
  }, []);

  // 선택 컴포넌트 그룹화 작업
  useEffect(() => {
    if (selectedPrimitivesLength > 1) {
      makeSelectedGroup();
    }
  }, [selectedPrimitivesLength]);

  // keyboard event
  useEffect(() => {
    keyboardSceneEvents();
  }, [keyboardEventStore.currentKeyEvent]);

  // contextMenu 실행
  useEffect(() => {
    executeContextMenu(scene);
  }, [contextMenuStore.currentSelectedContextMenu]);

  useEffect(() => {
    if (selectedPrimitive && selectedObjectStore.selectedMaterial) {
      setNewMesh(selectedPrimitive);
      newMesh.material = material;
      selectedObjectStore.setSelectedMaterial(materialName);
    }
  }, [selectedObjectStore.selectedMaterial]);

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

export default RenderScene;
