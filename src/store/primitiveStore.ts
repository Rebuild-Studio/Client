import { observable } from "mobx";
import * as THREE from "three";

type PrimitiveType = { [key: string]: JSX.Element };
type MeshType = { [key: string]: THREE.Mesh };

interface PrimitiveProps {
  primitives: PrimitiveType; // 렌더된 threeComponent들
  meshes: MeshType; // 렌더된 threeComponent들의 mesh 속성 바꿀 때 사용
  selectedPrimitives: MeshType; // 렌더된 threeComponent 중 선택한 컴포넌트
  addPrimitive: (storeId: string, primitive: JSX.Element) => void;
  removePrimitive: (storeId: string) => void;
  updatePrimitive: (storeId: string, mesh: THREE.Mesh) => void;
  clearPrimitives: () => void;
  addSelectedPrimitives: (storeId: string, mesh: THREE.Mesh) => void;
  updateSelectedPrimitives: (storeId: string, mesh: THREE.Mesh) => void;
  removeSelectedPrimitives: (storeId: string) => void;
  clearSelectedPrimitives: () => void;
}

const primitiveStore = observable<PrimitiveProps>({
  primitives: {},
  meshes: {},
  selectedPrimitives: {},
  addPrimitive(storeId, primitive) {
    this.primitives = {
      ...this.primitives,
      [storeId]: primitive,
    };
  },
  removePrimitive(storeId) {
    delete this.primitives[storeId];
    this.primitives = {
      ...this.primitives,
    };
  },
  updatePrimitive(storeId, mesh) {
    this.meshes[storeId] = mesh;
    this.meshes = {
      ...this.meshes,
    };
  },
  clearPrimitives() {
    this.primitives = {};
    this.meshes = {};
    this.selectedPrimitives = {};
  },
  addSelectedPrimitives(storeId, mesh) {
    this.selectedPrimitives = {
      ...this.selectedPrimitives,
      [storeId]: mesh,
    };
  },
  updateSelectedPrimitives(storeId, mesh) {
    this.selectedPrimitives[storeId] = mesh;
    this.selectedPrimitives = {
      ...this.selectedPrimitives,
    };
  },
  removeSelectedPrimitives(storeId) {
    delete this.selectedPrimitives[storeId];
    this.selectedPrimitives = {
      ...this.selectedPrimitives,
    };
  },
  clearSelectedPrimitives() {
    this.selectedPrimitives = {};
  },
});

export default primitiveStore;
