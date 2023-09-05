import { observable } from "mobx";
import * as THREE from "three";

type PrimitiveType = { [key: string]: THREE.Mesh };

interface PrimitiveProps {
  primitives: PrimitiveType;
  addPrimitive: (uuid: string, primitive: THREE.Mesh) => void;
  removePrimitive: (uuid: string) => void;
  updatePrimitive: (uuid: string, primitive: THREE.Mesh) => void;
}

const primitiveStore = observable<PrimitiveProps>({
  primitives: {},
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
  updatePrimitive(uuid, primitive) {
    this.primitives[uuid] = primitive;
    this.primitives = {
      ...this.primitives,
    };
  },
});

export default primitiveStore;
