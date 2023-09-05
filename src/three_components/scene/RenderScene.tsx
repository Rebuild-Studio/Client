import storeContainer from "@/store/storeContainer";
import { useFrame, useThree } from "@react-three/fiber";
import { observer } from "mobx-react";

const RenderScene = observer(() => {
  const { primitiveStore } = storeContainer;
  const raycaster = useThree((state) => state.raycaster);

  useFrame((state, delta) => {
    console.log(raycaster.intersectObjects(state.scene.children));
  });

  return Object.entries(primitiveStore.primitives).map(([id, primitive]) => {
    primitive.key = id;

    return primitive;
  });
});

export default RenderScene;
