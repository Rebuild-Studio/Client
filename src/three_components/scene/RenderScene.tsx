import storeContainer from "@/store/storeContainer";
import { useFrame, useThree } from "@react-three/fiber";
import { observer } from "mobx-react";
import { useEffect } from "react";
import onClickSceneEvents from "../utils/onClickSceneEvents";

const RenderScene = observer(() => {
  const { primitiveStore, mouseEventStore } = storeContainer;
  const raycaster = useThree((state) => state.raycaster);

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

  useEffect(() => {}, []);

  return Object.entries(primitiveStore.primitives).map(([id, primitive]) => {
    primitive.key = id;

    return primitive;
  });
});

export default RenderScene;
