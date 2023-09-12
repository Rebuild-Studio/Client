import storeContainer from "@/store/storeContainer";
import { useFrame, useThree } from "@react-three/fiber";
import { observer } from "mobx-react";
import { useEffect } from "react";
import onClickSceneEvents from "../utils/onClickSceneEvents";
import { nanoid } from "nanoid";
import SelectedGroup from "../group/SelectedGroup";

const RenderScene = observer(() => {
  const { primitiveStore, mouseEventStore } = storeContainer;
  const raycaster = useThree((state) => state.raycaster);
  const selectedPrimitivesLength = Object.keys(
    primitiveStore.selectedPrimitives
  ).length;

  useFrame((state, delta) => {
    const intersectObjects = raycaster.intersectObject(state.scene);
    switch (mouseEventStore.currentMouseEvent[0]) {
      case "onMouseDown": {
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

  return (
    <>
      {Object.entries(primitiveStore.primitives).map(([id, primitive]) => {
        primitive.key = id;

        return primitive;
      })}
      {primitiveStore.selectedGroupPrimitive}
    </>
  );
});

export default RenderScene;
