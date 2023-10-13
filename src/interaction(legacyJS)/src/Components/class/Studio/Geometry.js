import { data_store } from "../../stores/Data_Store";
import * as THREE from "three";
class Geometry {
  shape;
  mesh;
  constructor(shape) {
    this.shape = shape;
    const parameters = this.GetParameters();
    for (const prop of data_store[this.shape]) {
      parameters[prop[0]] = prop[3];
    }
    const paramDatas = [];
    for (const param in parameters) {
      paramDatas.push(parameters[param]);
    }

    const geometry = this.CreateGeometry(paramDatas);
    const material = new THREE.MeshPhysicalMaterial({ color: 0xbbbbbb });
    this.mesh = new THREE.Mesh(geometry, material);
    material.metalness = 0;
    material.roughness = 0.5;
    material.ior = 1.45;
    this.mesh.name = this.shape;
  }
  CreateGeometry(paramDatas) {
    switch (this.shape) {
      case "cube":
        return new THREE.BoxGeometry(...paramDatas);

      case "sphere":
        return new THREE.SphereGeometry(...paramDatas);

      case "cylinder":
        return new THREE.CylinderGeometry(...paramDatas);

      case "cone":
        return new THREE.ConeGeometry(...paramDatas);

      case "torus":
        return new THREE.TorusGeometry(...paramDatas);

      case "plane":
        return new THREE.PlaneGeometry(...paramDatas);

      case "capsule":
        return new THREE.CapsuleGeometry(...paramDatas);
      default:
        break;
    }
  }
  SetProps(prop, value) {
    const paramlist = this.mesh.geometry.parameters;

    paramlist[prop] = value;
    const paramDatas = [];
    for (const pr in paramlist) {
      paramDatas.push(paramlist[pr]);
    }

    this.mesh.geometry = this.CreateGeometry(paramDatas);
  }
  Copy() {
    const copyGeo = new Geometry(this.shape);
    copyGeo.mesh = this.mesh.clone();
    return copyGeo;
  }
  GetParameters() {
    switch (this.shape) {
      case "cube":
        return new THREE.BoxGeometry().parameters;

      case "sphere":
        return new THREE.SphereGeometry(0.5).parameters;

      case "cylinder":
        return new THREE.CylinderGeometry().parameters;

      case "cone":
        return new THREE.ConeGeometry().parameters;

      case "torus":
        return new THREE.TorusGeometry().parameters;

      case "plane":
        return new THREE.PlaneGeometry().parameters;

      case "capsule":
        return new THREE.CapsuleGeometry().parameters;

      default:
        break;
    }
  }
}

export default Geometry;
