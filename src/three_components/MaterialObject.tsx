import { useRef } from "react";
import { useServerMaterialLoader } from "../hooks/loader";

export const MaterialObject = (props: any) => {
  const { name } = props;
  const material = useServerMaterialLoader(name);
  const ref = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={ref} material={material} {...props}>
      <capsuleGeometry />
    </mesh>
  );
};
