import { nanoid } from "nanoid";
import * as THREE from "three";

const copyGroup = (group: THREE.Mesh) => {
  const storeId = nanoid();
  const newGroup = cloneGroupChildren(group);
  newGroup.userData["storeId"] = storeId;
  newGroup.position.copy(group.position);

  return { storeId, newGroup };
};

const cloneGroupChildren = (objects: THREE.Mesh, parent?: THREE.Mesh) => {
  const { newMesh } = copyObject(objects);

  if (parent) {
    parent.attach(newMesh);
  }

  for (const child of objects.children) {
    cloneGroupChildren(child as THREE.Mesh, newMesh);
  }

  return newMesh;
};

const copyObject = (mesh: THREE.Mesh) => {
  const storeId = nanoid();
  const geometry = mesh.geometry ? mesh.geometry.clone() : undefined;
  const material = mesh.material
    ? (mesh.material as THREE.Material).clone()
    : undefined;
  const newMesh = new THREE.Mesh(geometry, material);
  newMesh.scale.copy(mesh.scale);
  newMesh.rotation.copy(mesh.rotation);
  newMesh.name = mesh.name;
  newMesh.userData["storeId"] = storeId;

  if (mesh.parent && mesh.parent?.type !== "Scene") {
    newMesh.position.copy(mesh.getWorldPosition(new THREE.Vector3()));
  } else {
    newMesh.position.copy(mesh.position);
  }

  return { storeId, newMesh };
};

export { copyGroup, copyObject };
