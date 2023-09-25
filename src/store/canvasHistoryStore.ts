import { observable } from "mobx";
import primitiveStore, { MeshType } from "./primitiveStore";
import { renderPrimitive } from "@/three_components/utils/renderThreeComponents";

type CanvasInstance =
  | "CUBE"
  | "CAPSULE"
  | "CONE"
  | "CYLINDER"
  | "SPHERE"
  | "TORUS"
  | "GROUP"
  | "material"
  | "camera"
  | "light"
  | "initial";
type CanvasAttribute = "add" | "position" | "rotation" | "scale" | "none";
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
  differ: () => void;
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
      instance: "initial",
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

    return snapshot;
  },

  differ() {
    const meshes = primitiveStore.meshes;
    const keys = Object.keys(meshes);

    for (const key of keys) {
      const beforeMesh = this.redoList[0].snapshot[key];
      const mesh = meshes[key];
      const storeId = mesh.userData.storeId ?? mesh.uuid;

      // 추가 or 삭제
      if (!beforeMesh) {
        this.addHistory(storeId, mesh.name as CanvasInstance, "add");
        return;
      } else if (!mesh) {
        // TODO : mesh 지우는 기능 생기면 처리 필요
        return;
      }

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
      primitiveStore.addPrimitive(
        storeId,
        renderPrimitive(storeId, mesh.clone())
      );
    });
  },
});

export type { CanvasInstance, CanvasAttribute, CanvasHistoryType };
export default canvasHistoryStore;
