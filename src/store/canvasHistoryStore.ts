import { observable } from "mobx";
import {
  renderGroup,
  renderPrimitive,
} from "@/three_components/utils/renderThreeComponents";
import {
  CanvasAttribute,
  CanvasInstance,
  isCanvasAttribute,
  isCanvasInstance,
} from "@/resources/constants/canvas";
import * as THREE from "three";
import primitiveStore, { MeshType } from "./primitiveStore";

interface CanvasHistoryType {
  id: string;
  instance: CanvasInstance;
  attribute: CanvasAttribute;
  snapshot: MeshType;
}

type MeshProperty = keyof THREE.Mesh;
const attributes: MeshProperty[] = ["position", "rotation", "scale"];

interface CanvasHistoryStoreProps {
  undoList: CanvasHistoryType[];
  redoList: CanvasHistoryType[];
  addHistory: (
    id: string,
    instance: CanvasInstance,
    attr: CanvasAttribute,
    snapshot: MeshType
  ) => void;
  differAdd: (storeId: string) => void;
  differDelete: (storeId: string) => void;
  differUngroup: (storeId: string) => void;
  differMeshAttribute: () => void;
  undoListElementClick: (index: number) => void;
  redoListElementClick: (index: number) => void;
  createSnapshot: (props: MeshType) => MeshType;
  update: () => void;
}

const canvasHistoryStore = observable<CanvasHistoryStoreProps>({
  undoList: [],
  redoList: [
    {
      id: "0",
      instance: "INITIAL",
      attribute: "none",
      snapshot: {},
    },
  ],
  addHistory(id, instance, attribute, snapshot) {
    // console.log("meshes : ", Object.keys(primitiveStore.meshes));
    this.undoList = [];
    this.redoList = [
      {
        id,
        instance,
        attribute,
        snapshot,
      },
      ...this.redoList,
    ];
  },
  createSnapshot(meshes) {
    // 깊은 객체 복사
    const snapshot: MeshType = {};

    // 자식 있는 mesh들부터 처리
    const storeIds = Object.keys(meshes).sort(
      (a, b) => meshes[b].children.length - meshes[a].children.length
    );

    // 이미 저장한 storeId 체크용 (group, selectedGroup)
    const storeIdSet = new Set<string>();

    for (const storeId of storeIds) {
      if (storeIdSet.has(storeId)) continue;

      if (meshes[storeId].name === "SELECTED_GROUP") {
        meshes[storeId].updateMatrixWorld();
        meshes[storeId].traverse((child) => {
          if (child.name === "SELECTED_GROUP") return;

          const newChild = child.clone() as THREE.Mesh;
          const childStoreId = newChild.userData["storeId"];

          newChild.applyMatrix4(meshes[storeId].matrixWorld);
          snapshot[childStoreId] = newChild;
          storeIdSet.add(childStoreId);
        });
      } else {
        snapshot[storeId] = meshes[storeId].clone();
        storeIdSet.add(storeId);
      }
    }
    // console.log("snapshot : ", snapshot);
    return snapshot;
  },
  differAdd(storeId) {
    const beforeMesh = this.redoList[0].snapshot[storeId];
    const meshes = primitiveStore.meshes;
    const mesh = meshes[storeId];

    if (!beforeMesh) {
      this.addHistory(
        storeId,
        isCanvasInstance(mesh.name) ? mesh.name : "OBJECT",
        "add",
        this.createSnapshot(meshes)
      );
      return;
    }
  },
  differDelete(storeId) {
    const meshes = primitiveStore.meshes;

    this.addHistory(storeId, "OBJECT", "delete", this.createSnapshot(meshes));
  },
  differUngroup(storeId) {
    const meshes = primitiveStore.meshes;

    this.addHistory(storeId, "GROUP", "ungroup", this.createSnapshot(meshes));
  },
  differMeshAttribute() {
    const meshes = this.createSnapshot(primitiveStore.meshes);
    const keys = Object.keys(meshes);

    // 달라진 점 저장 변수
    let difference: [string, CanvasInstance, CanvasAttribute][] = [];

    for (const key of keys) {
      const beforeMesh = this.redoList[0].snapshot[key];
      const mesh = meshes[key];

      for (const attr of attributes) {
        if (!(beforeMesh[attr] as any).equals(mesh[attr])) {
          const storeId = mesh.userData.storeId ?? mesh.uuid;
          difference.push([
            storeId,
            isCanvasInstance(mesh.name) ? mesh.name : "OBJECT",
            isCanvasAttribute(attr) ? attr : "change",
          ]);
        }
      }
    }

    if (difference.length === 1) {
      this.addHistory(
        difference[0][0],
        difference[0][1],
        difference[0][2],
        meshes
      );
    } else if (difference.length > 1) {
      // 달라진 점이 여러개면 OBJECT로
      this.addHistory(difference[0][0], "OBJECT", "change", meshes);
    }
  },
  undoListElementClick(index) {
    const length = this.undoList.length;
    this.redoList = [
      ...this.undoList.splice(index, length - index),
      ...this.redoList,
    ];
    this.update();
  },
  redoListElementClick(index) {
    this.undoList = [...this.undoList, ...this.redoList.splice(0, index)];
    this.update();
  },

  update() {
    // console.log("update : ", this.redoList[0].snapshot);
    const meshEntries = Object.entries(this.redoList[0].snapshot);

    primitiveStore.clearPrimitives();
    primitiveStore.clearSelectedGroupPrimitive();

    for (const [storeId, mesh] of meshEntries) {
      switch (mesh.name) {
        case "GROUP":
          primitiveStore.addPrimitive(
            storeId,
            renderGroup(storeId, mesh.clone())
          );
          break;

        case "SELECTED_GROUP":
          // primitiveStore.addPrimitive(
          //   storeId,
          //   renderSelectedGroup(storeId, mesh.clone())
          // );
          break;

        default:
          primitiveStore.addPrimitive(
            storeId,
            renderPrimitive(storeId, mesh.clone())
          );
          break;
      }
    }
  },
});

export type { CanvasInstance, CanvasAttribute, CanvasHistoryType };
export default canvasHistoryStore;
