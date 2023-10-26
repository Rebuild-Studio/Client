import { makeAutoObservable } from "mobx";
import * as THREE from "three";

type PrimitiveType = { [key: string]: JSX.Element };
type MeshType = { [key: string]: THREE.Mesh };
type GroupPrimitiveType = [string, JSX.Element | null];

class PrimitiveStore {
  primitives: PrimitiveType = {};
  meshes: MeshType = {};
  selectedPrimitives: MeshType = {};
  selectedGroupPrimitive: GroupPrimitiveType = ["", null];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addPrimitive(storeId: string, primitive: JSX.Element) {
    this.primitives = {
      ...this.primitives,
      [storeId]: primitive,
    };
  }
  removePrimitive(storeId: string) {
    delete this.primitives[storeId];
    delete this.meshes[storeId];

    this.primitives = {
      ...this.primitives,
    };
    this.meshes = {
      ...this.meshes,
    };
  }
  updatePrimitive(storeId: string, mesh: THREE.Mesh) {
    this.meshes[storeId] = mesh;
    this.meshes = {
      ...this.meshes,
    };
  }
  clearPrimitives() {
    this.primitives = {};
    this.meshes = {};
    this.selectedPrimitives = {};
  }
  addSelectedPrimitives(storeId: string, mesh: THREE.Mesh) {
    this.selectedPrimitives = {
      ...this.selectedPrimitives,
      [storeId]: mesh,
    };
  }
  updateSelectedPrimitives(storeId: string, mesh: THREE.Mesh) {
    this.selectedPrimitives[storeId] = mesh;
    this.selectedPrimitives = {
      ...this.selectedPrimitives,
    };
  }
  removeSelectedPrimitives(storeId: string) {
    delete this.selectedPrimitives[storeId];
    this.selectedPrimitives = {
      ...this.selectedPrimitives,
    };
  }
  clearSelectedPrimitives() {
    this.selectedPrimitives = {};
    this.selectedGroupPrimitive = ["", null];
  }
  addSelectedGroupPrimitive(storeId: string, primitive: JSX.Element) {
    this.selectedGroupPrimitive = [storeId, primitive];
  }
  clearSelectedGroupPrimitive() {
    this.selectedGroupPrimitive = ["", null];
  }
}

const primitiveStore = new PrimitiveStore();

export type { PrimitiveType, MeshType };
export default primitiveStore;
