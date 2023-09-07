import { observable } from "mobx";
import * as THREE from "three";

type PrimitiveType = { [key: string]: JSX.Element };
type MeshType = { [key: string]: THREE.Mesh };

interface PrimitiveProps {
  primitives: PrimitiveType; // 렌더된 threeComponent들
  meshes: MeshType; // 렌더된 threeComponent들의 mesh 속성 바꿀 때 사용
  selectedPrimitives: MeshType; // 렌더된 threeComponent 중 선택한 컴포넌트
  addPrimitive: (storeID: string, primitive: JSX.Element) => void;
  removePrimitive: (storeID: string) => void;
  updatePrimitive: (storeID: string, mesh: THREE.Mesh) => void;
  clearPrimitives: () => void;
  addSelectedPrimitives: (storeID: string, mesh: THREE.Mesh) => void;
  updateSelectedPrimitives: (storeID: string, mesh: THREE.Mesh) => void;
  removeSelectedPrimitives: (storeID: string) => void;
  clearSelectedPrimitives: () => void;
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
  addSelectedPrimitives(storeID, mesh) {
    this.selectedPrimitives = {
      ...this.selectedPrimitives,
      [storeID]: mesh,
    };
  },
  updateSelectedPrimitives(storeId, mesh) {
    this.selectedPrimitives[storeId] = mesh;
    this.selectedPrimitives = {
      ...this.selectedPrimitives,
    };
  },
  removeSelectedPrimitives(storeID) {
    delete this.selectedPrimitives[storeID];
    this.selectedPrimitives = {
      ...this.selectedPrimitives,
    };
  },
  clearSelectedPrimitives() {
    this.selectedPrimitives = {};
  },
});

export default primitiveStore;
