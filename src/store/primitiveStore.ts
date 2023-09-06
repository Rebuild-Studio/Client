import { observable } from "mobx";
import * as THREE from "three";

type PrimitiveType = { [key: string]: JSX.Element };
type MeshType = { [key: string]: THREE.Mesh };

interface PrimitiveProps {
  primitives: PrimitiveType;
  meshes: MeshType;
  selectedPrimitives: MeshType;
  addPrimitive: (nnid: string, primitive: JSX.Element) => void;
  removePrimitive: (nnid: string) => void;
  updatePrimitive: (nnid: string, mesh: THREE.Mesh) => void;
  clearPrimitives: () => void;
}

const primitiveStore = observable<PrimitiveProps>({
  primitives: {},
  meshes: {},
  selectedPrimitives: {},
  addPrimitive(nnid, primitive) {
    this.primitives = {
      ...this.primitives,
      [nnid]: primitive,
    };
  },
  removePrimitive(nnid) {
    delete this.primitives[nnid];
    this.primitives = {
      ...this.primitives,
    };
  },
  updatePrimitive(nnid, mesh) {
    this.meshes[nnid] = mesh;
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
