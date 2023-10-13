import { observer } from "mobx-react";
import { PrimitiveProps } from "../common/PrimitiveProps";
import { useEffect, useRef } from "react";
import storeContainer from "@/store/storeContainer";
import * as THREE from "three";

const PointLight = observer((props: PrimitiveProps) => {
  const ref = useRef();
  const { primitiveStore } = storeContainer;
  const geometry = new THREE.SphereGeometry(0.23);
  const material = new THREE.MeshBasicMaterial({
    color: "rgb(255, 0, 0)",
  });
  material.transparent = true;
  material.opacity = 0.0;
  const mesh = props.propMesh ?? new THREE.Mesh(geometry, material);
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  mesh.name = "POINT_LIGHT";
  mesh.userData["storeId"] = props.storeId;
  mesh.userData["isLocked"] = false;

  // mesh texture 입혀야함
  const pointLight = new THREE.PointLight(0xffffff, 27.2, 100);

  useEffect(() => {
    if (!primitiveStore.meshes[props.storeId]) {
      mesh.attach(pointLight);
      primitiveStore.updatePrimitive(mesh.userData["storeId"], mesh);
      // history 추가 필요
    }
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
