import { makeObservable, observable, action, toJS } from "mobx";
import * as THREE from "three";
import { object_store } from "../../stores/Object_Store";
import { ObjectControllerVM } from "../../view_models/ObjectController_VM";
import { objectViewModel } from "../../view_models/Object_VM";

class MetaClass {
  objectId = 0;

  type = "Object";
  name = "";
  blobGlb = null;
  transform = null;
  bbox = new THREE.Box3();
  pivotVector = new THREE.Vector3();
  props = {};
  name_check_arr = [];
  name_counter = 0;
  url = null;
  loadJSON = false;
  editMesh = false;
  prefabId = null;
  parentId = null;
  childrenIds = [];
  originParentId = null;
  materialIndicesMapping = {};
  constructor(
    object,
    {
      objectId,
      name,
      blobGlb,
      url,
      loadJSON,
      type,
      children,
      materialIndicesMapping,
      props,
    }
  ) {
    makeObservable(this, {
      objectId: observable,
      name: observable,
      transform: observable,
      props: observable,
      blobGlb: observable,
      loadJSON: observable,
      materialIndicesMapping: observable,
      toJson: action,
      DeleteMeta: action,
      ReConstructor: action,
      SetProps: action,
      InitProps: action,
    });
    this.mesh = object;
    this.objectId = objectId ? objectId : object.uuid;
    this.materialIndicesMapping = materialIndicesMapping
      ? materialIndicesMapping
      : {};
    this.blobGlb = blobGlb;
    this.url = url;
    this.type = type;
    this.name = name;
    this.children = children;
    Array.from(object_store.metaObjects).map(
      (metaObject, index) =>
        metaObject.name && this.name_check(metaObject, name)
    );

    this.name_check_arr.sort(function (a, b) {
      return a - b;
    });

    //   this.InitProps();
    if (loadJSON !== true || loadJSON === undefined) {
      loadJSON = false; //this to see if it's loaded from JSON file
    }

    this.bbox.setFromObject(this.mesh);
    this.pivotVector.set(
      (this.bbox.max.x + this.bbox.min.x) / 2,
      this.bbox.min.y,
      (this.bbox.max.z + this.bbox.min.z) / 2
    );
    this.InitProps();
  }
  waitForVariable() {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.mesh && this.mesh.parent !== null) {
          clearInterval(interval);
          resolve();
        }
      }, 10); // Adjust the interval time as needed
    });
  }
  InitClass() {
    this.AddMeshToRaycasterArray();
    objectViewModel.AddMetaObject(this);
  }
  async ReConstructor({ parentId, childrenIds }) {
    if (typeof parentId !== "undefined") {
      this.parentId = parentId;
    }
    if (typeof childrenIds !== "undefined") {
      this.childrenIds = childrenIds;
    }
  }

  async Copy() {}

  AddMeshToRaycasterArray() {
    objectViewModel.addRaycastObject(this.mesh);
  }

  RemoveFromCollisionArray() {
    this.mesh.traverse((child) => {
      if (child.isMesh) {
        objectViewModel.deleteRaycastObject(child);
      }
    });
  }

  UpdateTransform() {
    this.transform = {
      position: this.mesh.position.clone(),
      rotation: this.mesh.rotation.clone(),
      scale: this.mesh.scale.clone(),
    };
  }

  async ExportGLB() {
    const gltfForm = new FormData();
    const glbName = this.name.replace(/\s/g, "-");
    gltfForm.append("asset", this.blobGlb, glbName + "_test.glb");

    // 서버로 전송
    const res = await TransferData.PostGLB(gltfForm);
    const jsonString = JSON.parse(res.request.response);
    this.url = jsonString.success[0].url;
  }

  async toJson(mode) {
    //Json 변환 전 처리

    if (this.blobGlb && mode === "save") {
      await this.ExportGLB();
    }

    return {
      name: this.name,
      objectId: this.objectId,
      url: this.url,
      props: this.props,
      blobGlb: this.blobGlb,
      type: this.type,
      editMesh: this.editMesh,
      groupId: this.groupId,
      parentId: this.parentId,
      childrenIds: this.childrenIds,
    };
  }

  InitProps() {
    this.props = {
      ...this.props,
      position: this.mesh["position"],
      rotation: this.mesh["rotation"],
      scale: this.mesh["scale"],
      visible: this.mesh["visible"],
    };
  }
  SetProps(prop, value) {
    switch (prop) {
      case "lock":
        this.props = { ...this.props, [prop]: value };
        break;
      default:
        if (typeof this.mesh[prop] !== "undefined") {
          if (typeof this.mesh[prop].copy === "function") {
            this.mesh[prop].copy(value);
          } else {
            this.mesh[prop] = value;
          }

          this.props = { ...this.props, [prop]: value };
        }

        break;
    }
  }
  GetProps(prop) {
    return this.props[prop];
  }

  getObjectByUuid(uuid) {
    this.mesh.traverse((child) => {
      if (child.uuid === uuid) {
        return child;
      }
    });
  }
  Delete() {
    ObjectControllerVM.DeSelectAll();
    this.RemoveFromCollisionArray();
    this.DeleteMeta();

    if (renderingContext_store.scene === this.mesh.parent) {
      objectViewModel.DeleteRenderObject(this);
    } else {
      this.DeleteFromParentClass(); //parent로부터 자신을 끊음.
    }
    delete this;
  }

  DeleteMeta() {
    objectViewModel.DeleteMetaObject(this);

    if (this.mesh.children) {
      //children이 존재할 경우 children도 같이 제거
      for (const child of this.mesh.children) {
        const childMetaObject = objectViewModel.GetMetaObjectByObjectId(
          child.uuid
        );
        if (childMetaObject) childMetaObject.DeleteMeta();
      }
    }
    this.childrenIds = [];
  }
  DeleteFromParentClass() {
    this.mesh.parent.remove(this.mesh);

    const parentMetaObject = objectViewModel.GetMetaObjectByObjectId(
      this.parentId
    );

    for (var i = 0; i < parentMetaObject.childrenIds.length; i++) {
      if (this.objectId === parentMetaObject.childrenIds[i]) {
        parentMetaObject.childrenIds.splice(i, 1);
        parentMetaObject.childrenIds = [...parentMetaObject.childrenIds];
      }
    }
    this.parentId = null;
  }

  name_check(metaObject, name) {
    //this will search for the ( ) that comes at the end of name(not metaObject.name)
    var left = metaObject.name.lastIndexOf("(");
    var right = metaObject.name.lastIndexOf(")");

    if (metaObject.name.substring(0, left) === name) {
      if (!isNaN(metaObject.name.substring(left + 1, right))) {
        this.name_check_arr.push(
          parseInt(metaObject.name.substring(left + 1, right))
        );
      }
    }
  }

  assignName(a) {
    //case when first number is not 1name_check_arr
    if (a[0] !== 1) {
      return 1;
    }

    //let temp;
    // iterating over the array
    for (let i = 0; i < a.length; i++) {
      // Check if i-th and
      // (i + 1)-th element
      // are not consecutive
      if (a[i] + 1 !== a[i + 1] && a[i] !== a[i + 1]) {
        return a[i] + 1;
      }
    }
  }

  setBbox() {
    this.bbox.setFromObject(this.mesh);
  }

  getBboxCenter() {
    const pVector = new THREE.Vector3();
    pVector.copy(
      new THREE.Vector3(
        (this.bbox.max.x + this.bbox.min.x) / 2,
        (this.bbox.max.y + this.bbox.min.y) / 2,
        (this.bbox.max.z + this.bbox.min.z) / 2
      )
    );

    return pVector;
  }

  SetGroupParent(objectId) {
    this.parentId = objectId;
  }
  AddGroupChildUuid(objectId) {
    this.childrenIds.push(objectId);
  }
  AddChildmetaObject(metaObject) {
    this.childrenIds.push(metaObject.objectId);
    metaObject.SetGroupParent(this.objectId);
    this.mesh.attach(metaObject.mesh);
  }
  RemoveChildrenId(ObjectId) {
    const index = this.childrenIds.findIndex((childId) => childId === ObjectId);
    if (index !== -1) {
      this.childrenIds.splice(index, 1);
    }
  }
}

export default MetaClass;
