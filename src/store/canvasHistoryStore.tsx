import { observable } from "mobx";
import primitiveStore, { MeshType } from "./primitiveStore";
import CubePrimitive from "@/three_components/primitives/CubePrimitive";
import CapsulePrimitive from "@/three_components/primitives/CapsulePrimitive";
import ConePrimitive from "@/three_components/primitives/ConePrimitive";
import CylinderPrimitive from "@/three_components/primitives/CylinderPrimitive";
import SpherePrimitive from "@/three_components/primitives/SpherePrimitive";
import TorusPrimitive from "@/three_components/primitives/TorusPrimitive";

export interface CanvasType {
  id: string;
  type: string;
  attribute: string;
  snapshot: MeshType;
}

type MeshProperty = keyof THREE.Mesh;

interface CanvasHistoryStoreProps {
  undoList: CanvasType[];
  redoList: CanvasType[];
  addHistory: (props: CanvasType) => void;
  differ: () => void;
  undoListElementClick: (index: number) => void;
  redoListElementClick: (index: number) => void;
  update: () => void;
  createSnapshot: (props: MeshType) => MeshType;
}

const canvasHistoryStore = observable<CanvasHistoryStoreProps>({
  undoList: [],
  redoList: [
    {
      id: "0",
      type: "initial",
      attribute: "",
      snapshot: {},
    },
  ],
  addHistory(canvasHistory) {
    this.undoList = [];
    this.redoList = [canvasHistory, ...this.redoList];
  },

  createSnapshot(meshes) {
    // 깊은 객체 복사
    const snapshot = new Object() as MeshType;
    for (const key in meshes) {
      snapshot[key] = meshes[key].clone();
    }

    return snapshot;
  },

  differ() {
    const meshes = primitiveStore.meshes;
    const keys = Object.keys(meshes);

    const snapshot = this.createSnapshot(meshes);

    for (const key of keys) {
      const beforeMesh = this.redoList[0].snapshot[key];
      const mesh = meshes[key];
      const storeId = mesh.userData.storeId ?? mesh.uuid;

      // 추가 or 삭제
      if (!beforeMesh) {
        console.log("add");
        this.addHistory({
          id: storeId,
          type: "object",
          attribute: "add",
          snapshot: snapshot,
        });
        return;
      } else if (!mesh) {
        // TODO : mesh 지우는 기능 생기면 처리 필요
        console.log("없어용");
        return;
      }

      // mesh의 속성이 다르면 체크
      const attributes: MeshProperty[] = ["position", "rotation", "scale"];
      for (const attr of attributes) {
        if (!(beforeMesh[attr] as any).equals(mesh[attr])) {
          // console.log(attr);
          this.addHistory({
            id: storeId,
            type: "object",
            attribute: attr,
            snapshot: snapshot,
          });
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
        case "CUBE":
          primitiveStore.addPrimitive(
            storeId,
            <CubePrimitive storeId={storeId} propMesh={mesh.clone()} />
          );

          break;
        case "CAPSULE":
          primitiveStore.addPrimitive(
            storeId,
            <CapsulePrimitive storeId={storeId} propMesh={mesh.clone()} />
          );
          break;
        case "CONE":
          primitiveStore.addPrimitive(
            storeId,
            <ConePrimitive storeId={storeId} propMesh={mesh.clone()} />
          );
          break;
        case "CYLINDER":
          primitiveStore.addPrimitive(
            storeId,
            <CylinderPrimitive storeId={storeId} propMesh={mesh.clone()} />
          );
          break;
        case "SPHERE":
          primitiveStore.addPrimitive(
            storeId,
            <SpherePrimitive storeId={storeId} propMesh={mesh.clone()} />
          );
          break;
        case "TORUS":
          primitiveStore.addPrimitive(
            storeId,
            <TorusPrimitive storeId={storeId} propMesh={mesh.clone()} />
          );
          break;

        default:
          break;
      }
    });
  },
});

export default canvasHistoryStore;
