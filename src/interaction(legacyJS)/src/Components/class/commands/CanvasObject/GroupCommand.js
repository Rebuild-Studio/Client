import { objectViewModel } from "../../../view_models/Object_VM";
import * as THREE from "three";
import MetaClass from "../../Studio/MetaClass";
import { common_store } from "../../../stores/Common_Store";

export default class GroupCommand {
  constructor(metaObjects) {
    this.type = "GroupCommand";
    this.name = "오브젝트 그룹";
    this.metaObjects = metaObjects;
    this.parentMetaObject = null;
    this.originParentMetaObject = null;
    this.childMetaObjects = [];
  }

  execute() {
    for (const child of renderingContext_store.scene.children) {
      if (child.name === "MultiSelect") {
        while (child.children.length > 0) {
          const targetmesh = child.children[0];
          const worldPosition = new THREE.Vector3();
          const worldScale = child.scale;
          const worldRotation = child.rotation;
          targetmesh.getWorldPosition(worldPosition);
          renderingContext_store.scene.add(targetmesh);
          targetmesh.position.x = worldPosition.x;
          targetmesh.position.y = worldPosition.y;
          targetmesh.position.z = worldPosition.z;

          targetmesh.scale.x *= worldScale.x;
          targetmesh.scale.y *= worldScale.y;
          targetmesh.scale.z *= worldScale.z;

          targetmesh.rotation.x += worldRotation.x;
          targetmesh.rotation.y += worldRotation.y;
          targetmesh.rotation.z += worldRotation.z;
        }
        renderingContext_store.scene.remove(child);
      }
      common_store.transcontrol.detach();
    }

    const group = new THREE.Group();
    this.parentMetaObject = new MetaClass(group, {
      objectId: null,
      name: "Group",
      type: "Group",
    });
    this.parentMetaObject.InitClass();
    const selectedObjectCount = this.metaObjects.length;
    for (const child of renderingContext_store.scene.children) {
      if (child.name === "MultiSelect") {
        while (child.children.length > 0) {
          const targetmesh = child.children[0];
          const worldPosition = new THREE.Vector3();
          targetmesh.getWorldPosition(worldPosition);
          renderingContext_store.scene.add(targetmesh);
          targetmesh.position.x = worldPosition.x;
          targetmesh.position.y = worldPosition.y;
          targetmesh.position.z = worldPosition.z;
        }
        renderingContext_store.scene.remove(child);
      }
    }

    for (const metaObject of this.metaObjects) {
      const worldPosition = new THREE.Vector3();
      metaObject.mesh.getWorldPosition(worldPosition);
      this.parentMetaObject.mesh.position.x += worldPosition.x;
      this.parentMetaObject.mesh.position.y += worldPosition.y;
      this.parentMetaObject.mesh.position.z += worldPosition.z;
    }

    this.parentMetaObject.mesh.position.x /= selectedObjectCount;
    this.parentMetaObject.mesh.position.y /= selectedObjectCount;
    this.parentMetaObject.mesh.position.z /= selectedObjectCount;

    if (objectViewModel.isSameGroup(this.metaObjects)) {
      this.originParentMetaObject = objectViewModel.GetMetaObjectByObjectId(
        this.metaObjects[0].parentId
      );

      for (const metaObject of this.metaObjects) {
        this.childMetaObjects.push(metaObject);

        this.originParentMetaObject.RemoveChildrenId(metaObject.objectId);
        this.parentMetaObject.AddChildmetaObject(metaObject);
      }
      this.originParentMetaObject.AddChildmetaObject(this.parentMetaObject);
    } else {
      for (const metaObject of this.metaObjects) {
        this.childMetaObjects.push(metaObject);
        if (metaObject.mesh.parent !== renderingContext_store.scene) {
          //다른 그룹에 있는 OBJECT 일 경우

          const otherParent = objectViewModel.GetMetaObjectByObjectId(
            metaObject.parentId
          );

          otherParent.RemoveChildrenId(metaObject.objectId);

          metaObject.originParentId = otherParent.objectId;
        }
        if (objectViewModel.IsRenderObject(metaObject)) {
          objectViewModel.DeleteRenderObject(metaObject);
        }
        this.parentMetaObject.AddChildmetaObject(metaObject);
      }

      objectViewModel.AddRenderObject(this.parentMetaObject);
    }
  }

  undo() {
    //Converting from local coordinates to world coordinates

    if (this.originParentMetaObject) {
      this.childMetaObjects.forEach((metaObject) => {
        metaObject.ConvertToWorldCoordinates("position");
        metaObject.ConvertToWorldCoordinates("scale");
        metaObject.ConvertToWorldCoordinates("rotation");
        //Remove object from parents
        metaObject.DeleteFromParentClass();

        this.parentMetaObject.RemoveChildrenId(metaObject.objectId);
        this.originParentMetaObject.AddChildmetaObject(metaObject);
      });
      this.originParentMetaObject.RemoveChildrenId(
        this.parentMetaObject.objectId
      );
      objectViewModel.DeleteMetaObject(this.parentMetaObject);
    } else {
      this.childMetaObjects.forEach((metaObject) => {
        metaObject.ConvertToWorldCoordinates("position");
        metaObject.ConvertToWorldCoordinates("scale");
        metaObject.ConvertToWorldCoordinates("rotation");
        //Remove object from parents
        metaObject.DeleteFromParentClass();
        //rendering add
        if (metaObject.originParentId) {
          const originParent = objectViewModel.GetMetaObjectByObjectId(
            metaObject.originParentId
          );
          originParent.AddChildmetaObject(metaObject);
        } else objectViewModel.AddRenderObject(metaObject);
      });
      objectViewModel.DeleteMetaObject(this.parentMetaObject);
      objectViewModel.DeleteRenderObject(this.parentMetaObject);
    }
    this.parentMetaObject = null;

    this.childMetaObjects = [];
  }
}
