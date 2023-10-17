import { makeObservable, observable, runInAction } from "mobx";
import { data_store } from "../../stores/Data_Store";

import MetaObject from "./MetaObject";
import { ObjectControllerVM } from "../../view_models/ObjectController_VM";
import canvasHistory_store from "../../stores/CanvasHistory_Store";
import AddObjCommand from "../commands/CanvasObject/AddObjCommand";

class MetaPrimitive extends MetaObject {
  geometry = null;
  constructor(object, arg) {
    super(object.mesh, arg);
    makeObservable(this, {
      geometry: observable,
    });
    runInAction(() => {
      this.geometry = object;
    });
    this.materialIndex = 0;
    this.InitProps();
  }

  async ReConstructor(mode, metaData) {
    Object.keys(metaData.props).map((prop) => {
      if (prop !== "geoParams" && prop !== "geometry") {
        this.SetProps(prop, metaData.props[prop]);
      }
    });
    this.ApplyMaterialSavedData(metaData.materialIndicesMapping); //Material Data 적용
  }

  InitProps() {
    super.InitProps();
    if (this.geometry) {
      if (
        this.type !== "Group" &&
        this.geometry !== "null" &&
        typeof data_store[this.geometry.shape] !== "undefined"
      ) {
        for (const param of data_store[this.geometry.shape]) {
          this.props = { ...this.props, [param[0]]: param[3] };
        }
      }
    }
  }

  SetProps(prop, value) {
    super.SetProps(prop, value);
    const propDescriptor = Object.getOwnPropertyDescriptor(
      this.geometry.GetParameters(),
      prop
    );
    if (propDescriptor && propDescriptor.writable) {
      this.geometry.SetProps(prop, value);
      runInAction(() => {
        this.props = { ...this.props, [prop]: value };
      });
    }
  }
  Copy() {
    ObjectControllerVM.DeSelectAll();
    const CopyGeo = this.geometry.Copy();

    const _Primitive = new MetaPrimitive(CopyGeo, {
      objectId: null,
      name: CopyGeo.mesh.name,
      blobGlb: null,
      url: null,
      loadJSON: null,
      type: "Object",
      props: this.props,
    });

    canvasHistory_store.execute(
      new AddObjCommand(_Primitive, _Primitive.objectId)
    );
  }
  async toJson(mode) {
    //Json 변환 전 처리
    const parentJsonDatas = await super.toJson(mode);
    const geometry = this.geometry.shape;

    const geoParams = {};
    for (const prop of data_store[this.geometry.shape]) {
      geoParams[prop[0]] = this.props[prop[0]];
    }
    return {
      ...parentJsonDatas,
      ["props"]: {
        ...parentJsonDatas["props"],
        geometry: this.geometry.shape,
        geoParams: geoParams,
      },
    };
  }
  async DeleteMeta(objectId) {
    super.DeleteMeta(objectId);
    delete this;
  }
}

export default MetaPrimitive;
