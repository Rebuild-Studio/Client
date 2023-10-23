import { observer } from "mobx-react";
import { PrimitiveProps } from "../common/PrimitiveProps";
import { useEffect, useRef } from "react";
import storeContainer from "@/store/storeContainer";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const PointLight = observer((props: PrimitiveProps) => {
  const ref = useRef();
  const pointLightGlb: THREE.Mesh = useLoader(
    GLTFLoader,
    "/glb/light/point_light.glb"
  ).scene.clone();
  const { primitiveStore } = storeContainer;
  const geometry = new THREE.SphereGeometry(0.23, 16, 8);
  const material = new THREE.MeshPhysicalMaterial();
  material.wireframe = true;
  material.transparent = true;
  const mesh = props.propMesh ?? new THREE.Mesh(geometry, material);
  mesh.name = "POINT_LIGHT";
  mesh.userData["storeId"] = props.storeId;
  mesh.userData["isLocked"] = false;

  useEffect(() => {
    mesh.attach(pointLightGlb.children[0].children[0]);
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

export default PointLight;
