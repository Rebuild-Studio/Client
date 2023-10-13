import { observer } from "mobx-react";
import { PrimitiveProps } from "../common/PrimitiveProps";
import { useEffect, useRef } from "react";
import storeContainer from "@/store/storeContainer";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const PointLight = observer((props: PrimitiveProps) => {
  const ref = useRef();
  const mesh: THREE.Mesh = useLoader(
    GLTFLoader,
    "/glb/light/point_light.glb"
  ).scene;
  const { primitiveStore } = storeContainer;
  // const mesh = new THREE.Mesh();
  mesh.name = "POINT_LIGHT";
  mesh.userData["storeId"] = props.storeId;

  // mesh.geometry = new THREE.SphereGeometry();
  // mesh.material.wire
  // const geometry = new THREE.SphereGeometry(0.23, 16, 8);
  // const material = new THREE.MeshBasicMaterial({
  //   color: "rgb(255, 0, 0)",
  // });
  // material.wireframe = true;
  // const mesh = new THREE.Mesh(geometry, material);
  // mesh.userData["storeId"] = props.storeId;
  // mesh.attach(pointLight);
  // material.transparent = true;
  // material.opacity = 0.0;
  // const mesh = props.propMesh ?? new THREE.Mesh(geometry, material);
  // mesh.castShadow = false;
  // mesh.receiveShadow = false;
  // mesh.name = "POINT_LIGHT";
  // mesh.userData["storeId"] = props.storeId;
  // mesh.userData["isLocked"] = false;
  // mesh.userData["lightColor"] = 0xff0000;
  // mesh.userData["intensity"] = 27.2;
  // mesh.userData["distance"] = 100;

  // const pointLight = new THREE.PointLight(
  //   mesh.userData["lightColor"],
  //   mesh.userData["intensity"],
  //   mesh.userData["distance"]
  // );

  useEffect(() => {
    if (!primitiveStore.meshes[props.storeId]) {
      // pointLight.color.set(0x000000);
      // console.log(pointLight);
      // console.log(loader.scene);
      // mesh.attach(pointLight);
      // mesh.attach(loader.scene);
      console.log(mesh);
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
