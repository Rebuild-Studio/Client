import * as THREE from 'three';
import { nanoid } from 'nanoid';

const copyGroup = (group: THREE.Mesh) => {
  const storeId = nanoid();
  const newGroup = cloneGroupChildren(group);
  newGroup.userData['storeId'] = storeId;
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
  newMesh.name = mesh.name;
  newMesh.userData = { ...mesh.userData };
  newMesh.userData['storeId'] = storeId;

  if (mesh.parent && mesh.parent?.type !== 'Scene') {
    mesh.getWorldScale(newMesh.scale);
    mesh.getWorldQuaternion(newMesh.quaternion);
    mesh.getWorldPosition(newMesh.position);
  } else {
    newMesh.scale.copy(mesh.scale);
    newMesh.rotation.copy(mesh.rotation);
    newMesh.position.copy(mesh.position);
  }

  return { storeId, newMesh };
};

export { copyGroup, copyObject };
