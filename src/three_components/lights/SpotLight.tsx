import { observer } from "mobx-react";
import { PrimitiveProps } from "../common/PrimitiveProps";
import { useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import storeContainer from "@/store/storeContainer";
import * as THREE from "three";

const SpotLight = observer((props: PrimitiveProps) => {
  const ref = useRef();
  const spotLightGlb: THREE.Mesh = useLoader(
    GLTFLoader,
    "/glb/light/spot_light.glb"
  ).scene.clone();
  const { primitiveStore } = storeContainer;
  const geometry = new THREE.ConeGeometry(0.57, 1.38, 8);
  const material = new THREE.MeshPhysicalMaterial();
  material.wireframe = true;
  material.transparent = true;

  const mesh = props.propMesh ?? new THREE.Mesh(geometry, material);
  mesh.name = "ASSET";
  mesh.userData["storeId"] = props.storeId;
  mesh.userData["light"] = "SPOT_LIGHT";

  useEffect(() => {
    mesh.attach(spotLightGlb.children[0].children[0]);
    primitiveStore.updatePrimitive(props.storeId, mesh);
    // history 추가 필요
  }, []);

  return (
    <>
      <primitive
        ref={ref}
        object={primitiveStore.meshes[props.storeId] ?? mesh}
      />
    </>
  );
});

export default SpotLight;
