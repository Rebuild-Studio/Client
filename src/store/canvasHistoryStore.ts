import { observable, runInAction, transaction } from "mobx";
import primitiveStore, { MeshType, PrimitiveType } from "./primitiveStore";
import {
  renderGroup,
  renderPrimitive,
  renderSelectedGroup,
} from "@/three_components/utils/renderThreeComponents";

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
  | "none";
interface CanvasHistoryType {
  id: string;
  instance: CanvasInstance;
  attribute: CanvasAttribute;
  snapshot: MeshType;
}

type MeshProperty = keyof THREE.Mesh;
interface CanvasHistoryStoreProps {
  isUpdating: boolean;
  undoList: CanvasHistoryType[];
  redoList: CanvasHistoryType[];
  addHistory: (
    id: string,
    instance: CanvasInstance,
    attr: CanvasAttribute
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
  isUpdating: false,
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
    for (const key in meshes) {
      snapshot[key] = meshes[key].clone();
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
  differMeshAttribute() {
    const meshes = primitiveStore.meshes;
    const keys = Object.keys(meshes).sort(
      (a, b) => meshes[b].children.length - meshes[a].children.length
    );

    for (const key of keys) {
      const beforeMesh = this.redoList[0].snapshot[key];
      const mesh = meshes[key];
      const storeId = mesh.userData.storeId ?? mesh.uuid;

      if (mesh.name === "SELECTED_GROUP") continue;

      // mesh의 속성이 다르면 체크 (equal 함수가 가능한 속성만)
      const attributes: MeshProperty[] = ["position", "rotation", "scale"];
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
    const meshEntries = Object.entries(this.redoList[0].snapshot);
    primitiveStore.clearPrimitives();

    meshEntries.forEach(([storeId, mesh]) => {
      switch (mesh.name) {
        case "GROUP":
          primitiveStore.addPrimitive(
            storeId,
            renderGroup(storeId, mesh.clone())
          );
          break;

        // case "SELECTED_GROUP":
        //   primitiveStore.addPrimitive(storeId, renderSelectedGroup(storeId));
        //   break;

        default:
          primitiveStore.addPrimitive(
            storeId,
            renderPrimitive(storeId, mesh.clone())
          );
          break;
      }
    });

    this.isUpdating = true;
  },
});

export type { CanvasInstance, CanvasAttribute, CanvasHistoryType };
export default canvasHistoryStore;
