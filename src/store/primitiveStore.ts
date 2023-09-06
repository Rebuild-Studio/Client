import { observable } from "mobx";
import * as THREE from "three";

type PrimitiveType = { [key: string]: JSX.Element };
type MeshType = { [key: string]: THREE.Mesh };

interface PrimitiveProps {
  primitives: PrimitiveType;
  meshes: MeshType;
  selectedPrimitives: MeshType;
  addPrimitive: (storeID: string, primitive: JSX.Element) => void;
  removePrimitive: (storeID: string) => void;
  updatePrimitive: (storeID: string, mesh: THREE.Mesh) => void;
  clearPrimitives: () => void;
}

const primitiveStore = observable<PrimitiveProps>({
  primitives: {},
  meshes: {},
  selectedPrimitives: {},
  addPrimitive(storeID, primitive) {
    this.primitives = {
      ...this.primitives,
      [storeID]: primitive,
    };
  },
  removePrimitive(storeID) {
    delete this.primitives[storeID];
    this.primitives = {
      ...this.primitives,
    };
  },
  updatePrimitive(storeID, mesh) {
    this.meshes[storeID] = mesh;
    this.meshes = {
      ...this.meshes,
    };
  },
  clearPrimitives() {
    this.primitives = {};
    this.meshes = {};
    this.selectedPrimitives = {};
  },
});

export default primitiveStore;
