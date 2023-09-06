import storeContainer from "@/store/storeContainer";
import { useFrame, useThree } from "@react-three/fiber";
import { observer } from "mobx-react";
import { useEffect } from "react";

const RenderScene = observer(() => {
  const { primitiveStore } = storeContainer;
  const raycaster = useThree((state) => state.raycaster);

  useFrame((state, delta) => {
    // console.log(raycaster.intersectObjects(state.scene.children));
  });

  useEffect(() => {}, []);

  return Object.entries(primitiveStore.primitives).map(([id, primitive]) => {
    primitive.key = id;

    return primitive;
  });
});

export default RenderScene;
