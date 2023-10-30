import * as THREE from 'three';
import { makeAutoObservable } from 'mobx';
import {
  CanvasAttribute,
  CanvasInstance,
  isCanvasAttribute,
  isCanvasInstance
} from '@/resources/constants/canvas';
import { copyGroup, copyObject } from '@/three_components/utils/copyObject.ts';
import { renderObjects } from '@/three_components/utils/renderThreeComponents';
import primitiveStore, { MeshType } from './primitive.store.ts';

interface CanvasHistoryType {
  instance: CanvasInstance;
  attribute: CanvasAttribute;
  snapshot: MeshType;
}

type MeshProperty = keyof THREE.Mesh;
const attributes: MeshProperty[] = ['position', 'rotation', 'scale'];

class CanvasHistoryStore {
  undoList: CanvasHistoryType[] = [];
  redoList: CanvasHistoryType[] = [
    {
      instance: 'INITIAL',
      attribute: 'none',
      snapshot: {}
    }
  ];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addHistory(instance: CanvasInstance, attribute: CanvasAttribute) {
    const snapshot = this.createSnapshot(primitiveStore.meshes);
    this.undoList = [];
    this.redoList = [
      {
        instance,
        attribute,
        snapshot
      },
      ...this.redoList
    ];
  }
  createSnapshot(meshes: MeshType): MeshType {
    // 깊은 객체 복사
    const snapshot: MeshType = {};

    // 이미 저장한 storeId 체크용 (group, selectedGroup)
    const storeIdSet = new Set<string>();

    // 선택한 오브젝트들 부터 처리
    const selectedGroupStoreId = Object.keys(meshes).filter(
      (storeId) => meshes[storeId].name === 'SELECTED_GROUP'
    )[0];

    if (selectedGroupStoreId) {
      const children = meshes[selectedGroupStoreId].children as THREE.Mesh[];

      for (const child of children) {
        if (child.name === 'GROUP') {
          const { storeId: _, newGroup } = copyGroup(child);
          const storeId = child.userData['storeId'];
          newGroup.userData['storeId'] = storeId;
          snapshot[storeId] = newGroup;
          storeIdSet.add(storeId);
        } else {
          const { storeId: _, newMesh } = copyObject(child);
          const storeId = child.userData['storeId'];
          newMesh.userData['storeId'] = storeId;
          snapshot[storeId] = newMesh;
          storeIdSet.add(storeId);
        }
      }
    }

    const storeIds = Object.keys(meshes).filter(
      (storeId) => meshes[storeId].name !== 'SELECTED_GROUP'
    );

    for (const storeId of storeIds) {
      if (storeIdSet.has(storeId)) continue;

      if (meshes[storeId].name === 'SELECTED_GROUP') {
        meshes[storeId].updateMatrixWorld();
        meshes[storeId].traverse((child) => {
          if (child.name === 'SELECTED_GROUP') return;

          const newChild = child.clone() as THREE.Mesh;
          const childStoreId = newChild.userData['storeId'];

          newChild.applyMatrix4(meshes[storeId].matrixWorld);
          snapshot[childStoreId] = newChild;
          storeIdSet.add(childStoreId);
        });
      } else {
        const { storeId: _, newMesh } = copyObject(meshes[storeId]);
        newMesh.userData['storeId'] = storeId;
        snapshot[storeId] = newMesh;
        storeIdSet.add(storeId);
      }
    }

    return snapshot;
  }
  differAdd(storeId: string) {
    const beforeMesh = this.redoList[0].snapshot[storeId];
    const meshes = primitiveStore.meshes;
    const mesh = meshes[storeId];

    if (!beforeMesh) {
      this.addHistory(
        isCanvasInstance(mesh.name) ? mesh.name : 'OBJECT',
        'add'
      );
      return;
    }
  }
  differMeshAttribute() {
    const meshes = this.createSnapshot(primitiveStore.meshes);
    const keys = Object.keys(meshes);

    // 달라진 점 저장 변수
    const difference: [CanvasInstance, CanvasAttribute][] = [];

    for (const key of keys) {
      const beforeMesh = this.redoList[0].snapshot[key];
      const mesh = meshes[key];

      for (const attr of attributes) {
        if (!(beforeMesh[attr] as any).equals(mesh[attr])) {
          difference.push([
            isCanvasInstance(mesh.name) ? mesh.name : 'OBJECT',
            isCanvasAttribute(attr) ? attr : 'change'
          ]);
        }
      }
    }

    if (difference.length === 1) {
      this.addHistory(difference[0][0], difference[0][1]);
    } else if (difference.length > 1) {
      // 달라진 점이 여러개면 OBJECT로
      this.addHistory('OBJECT', 'change');
    }
  }
  undoListElementClick(index: number) {
    const length = this.undoList.length;
    this.redoList = [
      ...this.undoList.splice(index, length - index),
      ...this.redoList
    ];
    this.update();
  }
  redoListElementClick(index: number) {
    this.undoList = [...this.undoList, ...this.redoList.splice(0, index)];
    this.update();
  }
  update() {
    primitiveStore.clearPrimitives();
    const meshList = Object.values(this.redoList[0].snapshot);

    renderObjects(primitiveStore, meshList);
  }
}

const canvasHistoryStore = new CanvasHistoryStore();

export type { CanvasInstance, CanvasAttribute, CanvasHistoryType };
export default canvasHistoryStore;
