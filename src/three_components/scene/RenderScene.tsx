import storeContainer from "@/store/storeContainer";
import { useThree } from "@react-three/fiber";
import { observer } from "mobx-react";
import { useEffect } from "react";
import onClickSceneEvents from "../utils/onClickSceneEvents";
import onContextMenuSceneEvents from "../utils/onContextMenuSceneEvents";
import onMouseDownSceneEvents from "../utils/onMouseDownSceneEvents";
import Gizmo from "../gizmo/Gizmo";
import keyboardSceneEvents from "../utils/keyboardSceneEvents";
import makeSelectedGroup from "../utils/makeSelectedGroup";
import executeContextMenu from "../utils/executeContextMenu";
import SelectedOutline from "../post_processing/SelectedOutline";
import { EffectComposer } from "@react-three/postprocessing";
import ChildGizmo from "../gizmo/ChildGizmo";

const RenderScene = observer(() => {
  const {
    primitiveStore,
    mouseEventStore,
    contextMenuStore,
    keyboardEventStore,
  } = storeContainer;
  const raycaster = useThree((state) => state.raycaster);
  const scene = useThree((state) => state.scene);
  const selectedPrimitivesLength = Object.keys(
    primitiveStore.selectedPrimitives
  ).length;

  // mouse event
  useEffect(() => {
    const intersectObjects = raycaster.intersectObject(scene);
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
  }, [mouseEventStore.currentMouseEvent]);

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

  return (
    <>
      <EffectComposer autoClear={false}>
        <SelectedOutline />
      </EffectComposer>

      {/* 일반 Object 용 */}
      <Gizmo
        storeId={
          primitiveStore.meshes[
            Object.keys(primitiveStore.selectedPrimitives)[0]
          ] && Object.keys(primitiveStore.selectedPrimitives)[0]
        }
      />

      {/* Group 자식용 */}
      <ChildGizmo />

      {Object.entries(primitiveStore.primitives).map(([id, primitive]) => {
        primitive.key = id;

        return primitive;
      })}
      {primitiveStore.selectedGroupPrimitive[1]}
    </>
  );
});

export default RenderScene;
