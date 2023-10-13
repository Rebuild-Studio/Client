import { objectViewModel } from "../../../view_models/Object_VM";
import * as THREE from "three";

export default class UnGroupCommand {
  constructor(metaGroup) {
    this.type = "UnGroupCommand";
    this.name = "오브젝트 그룹 해제";
    this.metaGroup = metaGroup;
    this.parentMetaObject = null;
    this.originParentMetaObject = null;
    this.childMetaObjects = [];
  }

  execute() {
    const parent = this.metaGroup.mesh.parent;
    for (const childId of this.metaGroup.childrenIds) {
      const childMetaObject = objectViewModel.GetMetaObjectByObjectId(childId);

      this.childMetaObjects.push(childMetaObject);
    }
    if (parent === renderingContext_store.scene) {
      for (const childMetaObject of this.childMetaObjects) {
        childMetaObject.ConvertToWorldCoordinates("position");
        childMetaObject.ConvertToWorldCoordinates("scale");
        childMetaObject.ConvertToWorldCoordinates("rotation");
        childMetaObject.DeleteFromParentClass();
        if (childMetaObject.originParentId) {
          const originParent = objectViewModel.GetMetaObjectByObjectId(
            childMetaObject.originParentId
          );
          originParent.AddChildmetaObject(childMetaObject);
        } else {
          objectViewModel.AddRenderObject(childMetaObject);
        }
      }
      objectViewModel.DeleteMetaObject(this.metaGroup);
      objectViewModel.DeleteRenderObject(this.metaGroup);
    } else {
      //그룹내에 그룹
      this.parentMetaObject = objectViewModel.GetMetaObjectByObjectId(
        this.metaGroup.parentId
      );
      for (const childMetaObject of this.childMetaObjects) {
        childMetaObject.ConvertToWorldCoordinates("position");
        childMetaObject.ConvertToWorldCoordinates("scale");
        childMetaObject.ConvertToWorldCoordinates("rotation");
        childMetaObject.DeleteFromParentClass();

        this.metaGroup.RemoveChildrenId(childMetaObject.objectId);
        this.parentMetaObject.AddChildmetaObject(childMetaObject);
      }
      objectViewModel.DeleteMetaObject(this.metaGroup);
    }
  }

  undo() {
    this.metaGroup.InitClass();
    const selectedObjectCount = this.childMetaObjects.length;

    for (const metaObject of this.childMetaObjects) {
      const worldPosition = new THREE.Vector3();
      metaObject.mesh.getWorldPosition(worldPosition);
      this.metaGroup.mesh.position.x += worldPosition.x;
      this.metaGroup.mesh.position.y += worldPosition.y;
      this.metaGroup.mesh.position.z += worldPosition.z;
    }

    this.metaGroup.mesh.position.x /= selectedObjectCount;
    this.metaGroup.mesh.position.y /= selectedObjectCount;
    this.metaGroup.mesh.position.z /= selectedObjectCount;

    if (objectViewModel.isSameGroup(this.childMetaObjects)) {
      this.originParentMetaObject = objectViewModel.GetMetaObjectByObjectId(
        this.childMetaObjects[0].parentId
      );

      for (const metaObject of this.childMetaObjects) {
        this.originParentMetaObject.RemoveChildrenId(metaObject.objectId);

        this.metaGroup.AddChildmetaObject(metaObject);
      }
      this.originParentMetaObject.AddChildmetaObject(this.metaGroup);
    } else {
      for (const metaObject of this.childMetaObjects) {
        if (metaObject.mesh.parent !== renderingContext_store.scene) {
          const otherParent = objectViewModel.GetMetaObjectByObjectId(
            metaObject.parentId
          );

          otherParent.RemoveChildrenId(metaObject.objectId);

          metaObject.originParentId = otherParent.objectId;
        }
        if (objectViewModel.IsRenderObject(metaObject)) {
          objectViewModel.DeleteRenderObject(metaObject);
        }

        this.metaGroup.AddChildmetaObject(metaObject);
      }
      objectViewModel.AddRenderObject(this.metaGroup);
    }
    this.childMetaObjects = [];
  }
}
