import { observable } from "mobx";
import * as THREE from "three";

const object_store = observable({
  metaObjects: [],
  objectClipBoard: null,
  outlineObjects: [],
  prevPosition: new THREE.Vector3(),
  prevRotation: new THREE.Euler(),
  raycastObjects: [],
  selectedObjects: [],
  isObjectSelected: false,
  renderObjects: [],
});

export { object_store };
