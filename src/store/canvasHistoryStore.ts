import { observable } from "mobx";
import primitiveStore, { MeshType } from "./primitiveStore";
import {
  renderGroup,
  renderPrimitive,
  renderSelectedGroup,
} from "@/three_components/utils/renderThreeComponents";
import * as THREE from "three";

type CanvasInstance =
  | "OBJECT"
  | "CUBE"
  | "CAPSULE"
  | "CONE"
  | "CYLINDER"
  | "SPHERE"
  | "TORUS"
  | "GROUP"
  | "SELECTED_GROUP"
  | "MATERIAL"
  | "CAMERA"
  | "POINTLIGHT"
  | "SPOTLIGHT"
  | "INITIAL";
type CanvasAttribute =
  | "add"
  | "position"
  | "rotation"
  | "scale"
  | "delete"
  | "ungroup"
  | "none"
  | "change";
interface CanvasHistoryType {
  id: string;
  instance: CanvasInstance;
  attribute: CanvasAttribute;
  snapshot: MeshType;
}

type MeshProperty = keyof THREE.Mesh;
interface CanvasHistoryStoreProps {
  undoList: CanvasHistoryType[];
  redoList: CanvasHistoryType[];
  addHistory: (
    id: string,
    instance: CanvasInstance,
    attr: CanvasAttribute
  ) => void;
  compareMesh: (beforeMesh: THREE.Mesh, mesh: THREE.Mesh) => void;
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
  addHistory(id, instance, attribute) {
    // console.log("meshes : ", Object.keys(primitiveStore.meshes));
    this.undoList = [];
    this.redoList = [
      {
        id,
        instance,
        attribute,
        snapshot: this.createSnapshot(primitiveStore.meshes),
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
        meshes[storeId].traverse((child) => {
          const newChild = child.clone() as THREE.Mesh;

          if (newChild.name === "SELECTED_GROUP") return;

          const childStoreId = newChild.userData["storeId"];
          newChild.position.copy(child.getWorldPosition(new THREE.Vector3()));
          newChild.quaternion.copy(
            child.getWorldQuaternion(new THREE.Quaternion())
          );
          newChild.scale.copy(child.getWorldScale(new THREE.Vector3()));
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
      this.addHistory(storeId, mesh.name as CanvasInstance, "add");
      return;
    }
  },
  differDelete(storeId) {
    this.addHistory(storeId, "OBJECT" as CanvasInstance, "delete");
  },
  differUngroup(storeId) {
    this.addHistory(storeId, "GROUP" as CanvasInstance, "ungroup");
  },
  compareMesh(beforeMesh, mesh) {
    const attributes: MeshProperty[] = ["position", "rotation", "scale"];
    const storeId = mesh.userData.storeId ?? mesh.uuid;

    for (const attr of attributes) {
      if (!(beforeMesh[attr] as any).equals(mesh[attr])) {
        this.addHistory(
          storeId,
          mesh.name as CanvasInstance,
          attr as CanvasAttribute
        );
        return;
      }
    }
  },
  differMeshAttribute() {
    const meshes = this.createSnapshot(primitiveStore.meshes);
    const keys = Object.keys(meshes);

    for (const key of keys) {
      const beforeMesh = this.redoList[0].snapshot[key];
      const mesh = meshes[key];

      const attributes: MeshProperty[] = ["position", "rotation", "scale"];
      const storeId = mesh.userData.storeId ?? mesh.uuid;

      let difference = [];

      for (const attr of attributes) {
        if (!(beforeMesh[attr] as any).equals(mesh[attr])) {
          difference.push([mesh.name, attr]);
        }
      }

      if (difference.length === 1) {
        this.addHistory(
          storeId,
          difference[0][0] as CanvasInstance,
          difference[0][1] as CanvasAttribute
        );
      } else if (difference.length > 1) {
        this.addHistory(storeId, "OBJECT", "change");
      }
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
