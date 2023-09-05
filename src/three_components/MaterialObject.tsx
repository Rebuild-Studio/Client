import { useRef } from "react";
import { useMaterialLoader } from "../hooks/loader";

export const MaterialObject = (props: any) => {
  const { name } = props;
  const material = useMaterialLoader(name);
  const ref = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={ref} material={material} {...props}>
      <capsuleGeometry />
    </mesh>
  );
};
