import { observable } from "mobx";
import * as THREE from "three";

type PrimitiveType = { [key: string]: JSX.Element };
type MeshType = { [key: string]: THREE.Mesh };
type GroupPrimitiveType = [string, JSX.Element | null];

interface PrimitiveStore {
  primitives: PrimitiveType; // 렌더된 threeComponent들 렌더된 컴포넌트 중 일부는 이곳에 없을 수 있음 scene에 직접 다루어지기 때문
  meshes: MeshType; // 렌더된 threeComponent들의 mesh 속성 바꿀 때 사용
  selectedPrimitives: MeshType; // 렌더된 threeComponent 중 선택한 컴포넌트
  selectedGroupPrimitive: GroupPrimitiveType; // 다중 선택한 threeComponent 렌더
  addPrimitive: (storeId: string, primitive: JSX.Element) => void;
  removePrimitive: (storeId: string) => void;
  updatePrimitive: (storeId: string, mesh: THREE.Mesh) => void;
  clearPrimitives: () => void;
  addSelectedPrimitives: (storeId: string, mesh: THREE.Mesh) => void;
  updateSelectedPrimitives: (storeId: string, mesh: THREE.Mesh) => void;
  removeSelectedPrimitives: (storeId: string) => void;
  clearSelectedPrimitives: () => void;
  addSelectedGroupPrimitive: (storeId: string, primitive: JSX.Element) => void;
  clearSelectedGroupPrimitive: () => void;
}

const primitiveStore = observable<PrimitiveStore>({
  primitives: {},
  meshes: {},
  selectedPrimitives: {},
  selectedGroupPrimitive: ["", null],
  addPrimitive(storeId, primitive) {
    this.primitives = {
      ...this.primitives,
      [storeId]: primitive,
    };
  },
  removePrimitive(storeId) {
    delete this.primitives[storeId];
    delete this.meshes[storeId];

    this.primitives = {
      ...this.primitives,
    };
    this.meshes = {
      ...this.meshes,
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
    this.selectedGroupPrimitive = ["", null];
  },
  addSelectedGroupPrimitive(storeId, primitive) {
    this.selectedGroupPrimitive = [storeId, primitive];
  },
  clearSelectedGroupPrimitive() {
    this.selectedGroupPrimitive = ["", null];
  },
});

export type { PrimitiveType, MeshType, PrimitiveStore };
export default primitiveStore;
