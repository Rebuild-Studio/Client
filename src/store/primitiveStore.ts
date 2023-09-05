import { observable } from "mobx";
import * as THREE from "three";

type PrimitiveType = { [key: string]: JSX.Element };
type MeshType = { [key: string]: THREE.Mesh };

interface PrimitiveProps {
  primitives: PrimitiveType;
  meshes: MeshType;
  selectedPrimitives: MeshType;
  addPrimitive: (uuid: string, primitive: JSX.Element) => void;
  removePrimitive: (uuid: string) => void;
  updatePrimitive: (uuid: string, mesh: THREE.Mesh) => void;
  clearPrimitives: () => void;
}

const primitiveStore = observable<PrimitiveProps>({
  primitives: {},
  meshes: {},
  selectedPrimitives: {},
  addPrimitive(uuid, primitive) {
    this.primitives = {
      ...this.primitives,
      [uuid]: primitive,
    };
  },
  removePrimitive(uuid) {
    delete this.primitives[uuid];
    this.primitives = {
      ...this.primitives,
    };
  },
  updatePrimitive(uuid, mesh) {
    this.meshes[uuid] = mesh;
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
