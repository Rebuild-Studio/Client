import { objectViewModel } from "../../view_models/Object_VM";
import MetaClass from "./MetaClass";
import * as THREE from "three";
class MetaCamera extends MetaClass {
  camera = null;
  classType = "Camera";
  constructor(object, arg) {
    super(object, arg);
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.camera = camera;
    renderingContext_store.setPreviewCamera(this.camera);
    this.mesh.add(this.camera);
    this.InitProps();
  }

  InitProps() {
    super.InitProps();
    if (this.camera) {
      const fov = this.camera["fov"];
      const near = this.camera["near"];
      const far = this.camera["far"];
      const type = this.camera["type"];
      const name = this.camera.name !== "" ? this.camera.name : "camera";

      this.props = {
        ...this.props,
        cameraType: type,
        name: name,
        fov: fov,
        near: near,
        far: far,
      };
    }
  }
  AddMeshToRaycasterArray() {
    this.mesh.traverse((child) => {
      if (child.isMesh) {
        objectViewModel.addRaycastObject(child);
      }
    });
  }
  async ReConstructor(mode, args) {
    await super.ReConstructor(mode, args);

    renderingContext_store.setPreviewCamera(this.camera);
    renderingContext_store.setIsPreviewCameraExist(true);

    Object.keys(args.props).map((prop) => {
      return this.SetProps(prop, args.props[prop]);
    });
  }

  SetProps(prop, value) {
    super.SetProps(prop, value);
    const propDescriptor = Object.getOwnPropertyDescriptor(this.camera, prop);
    if (this.camera[prop] && propDescriptor && propDescriptor.writable) {
      this.camera[prop] = value;
      this.props = { ...this.props, [prop]: value };
    }
  }
  Copy() {
    return;
  }
  Delete() {
    renderingContext_store.setPreviewCamera(null);
    renderingContext_store.setIsPreviewCameraExist(false);
    super.Delete();
    delete this;
  }
}

export default MetaCamera;
