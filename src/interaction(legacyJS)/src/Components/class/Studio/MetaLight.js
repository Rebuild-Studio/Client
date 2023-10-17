import { rgbaToHexa } from "@uiw/color-convert";
import * as THREE from "three";
import MetaClass from "./MetaClass";
import { makeObservable, observable } from "mobx";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils";
import { objectViewModel } from "../../view_models/Object_VM";
import { ObjectControllerVM } from "../../view_models/ObjectController_VM";
class MetaLight extends MetaClass {
  hasLight = false;
  light = null;
  constructor(object, arg) {
    super(object, arg);

    makeObservable(this, {
      light: observable,
    });
    this.mesh.traverse((child) => {
      if (child.isLight) {
        child.castShadow = true;
        this.light = child;
        this.InitProps();
        this.hasLilght = true;
      }
    });
    this.CreateLightObject(this.props["lightType"]);
  }

  async ReConstructor(mode, args) {
    await super.ReConstructor(mode, args);

    if (args.props) {
      Object.keys(args.props).map((prop) => {
        this.SetProps(prop, args.props[prop]);
      });
    }
  }

  InitProps() {
    super.InitProps();
    if (this.light) {
      const intensity = this.light["intensity"];
      const castShadow = this.light["castShadow"];
      const lightType = this.light["type"];

      const helper_visible = this.light["parent"]["material"]["visible"];
      const radius = this.light["shadow"]["radius"];
      const decay = this.light["decay"];

      const color = (() => {
        if (this.light["color"].isColor === true) {
          //this only happens if light is made from MX studio at first
          const init_color = new THREE.Color(255, 255, 255);
          return rgbaToHexa(init_color);
        } else return this.light["color"];
      })();
      const angle = (() => {
        if (lightType === "SpotLight") return this.light["angle"];
        else return null;
      })();
      const penumbra = (() => {
        if (lightType === "SpotLight") return this.light["penumbra"];
        else return null;
      })();

      this.light["shadow"].bias = -0.0001;
      this.light["shadow"].mapSize.width = 1024;
      this.light["shadow"].mapSize.height = 1024;
      const shadow_resolution = this.light["shadow"]["mapSize"]["x"];

      const name =
        this.light.name !== "" ? this.light.name : "light" + this.lightCount++;

      this.props = {
        ...this.props,
        lightType: lightType,
        name: name,
        intensity: intensity,
        castShadow: castShadow,
        color: color,
        angle: angle,
        penumbra: penumbra,
        helper_visible: helper_visible,
        shadow_resolution: shadow_resolution,
        radius: radius,
        decay: decay,
      };
    }
  }
  CreateLightObject(type) {
    let geometry = null;
    const material = new THREE.MeshBasicMaterial({
      color: "rgb(255, 0, 0)",
    });
    material.transparent = true;
    material.opacity = 0.0;
    switch (type) {
      case "SpotLight":
        geometry = new THREE.ConeGeometry(0.57, 1.38, 32);

        break;
      case "PointLight":
        geometry = new THREE.SphereGeometry(0.23);

        break;
      default:
        break;
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    if (this.props["lightType"] === "SpotLight") mesh.position.y -= 0.69;

    this.mesh.add(mesh);
    objectViewModel.addRaycastObject(mesh);
  }

  SetProps(prop, value) {
    super.SetProps(prop, value);
    const propDescriptor = Object.getOwnPropertyDescriptor(this.light, prop);

    switch (prop) {
      case "angle":
        if (this.props["angle"]) {
          this.mesh.scale.x = value * 2.5;
          this.mesh.scale.z = value * 2.5;
        }
        this.light["angle"] = value;
        this.props = { ...this.props, [prop]: value };
        break;
      case "helper_visible":
        this.light[prop] = value;
        this.light.parent.material.visible = value;
        this.light.parent.parent.children[1].material.visible = value;
        this.props = { ...this.props, [prop]: value };
        break;
      case "shadow_resolution":
        this.light.shadow.mapSize.width = value;
        this.light.shadow.mapSize.height = value;
        if (this.light.shadow.map) {
          this.light.shadow.map.dispose();
          this.light.shadow.map = null;
        }
        this.props = { ...this.props, [prop]: value };
        break;
      case "radius":
        this.light.shadow.radius = value;
        this.light[prop] = value;
        this.light.shadow.needsUpdate = true;
        this.props = { ...this.props, [prop]: value };
        break;
      default:
        if (propDescriptor && propDescriptor.writable) {
          if (typeof this.light[prop].set === "function") {
            this.light[prop].set(value);
          } else if (typeof this.light[prop].copy === "function") {
            this.light[prop].copy(value);
          } else this.light[prop] = value;
          this.props = { ...this.props, [prop]: value };
        }
        break;
    }
  }
  Copy() {
    ObjectControllerVM.DeSelectAll();
    const cloneObject = SkeletonUtils.clone(this.mesh);

    cloneObject.traverse((node) => {
      if (node.isMesh) {
        node.material = node.material.clone();
      } else if (node.isLight) {
        const targetObject = new THREE.Object3D();
        node.add(targetObject);
        targetObject.position.set(0, 0, -1);
        node.target = targetObject;
      }
    });

    const copyLightObject = new MetaLight(cloneObject, {
      objectId: null,
      name: this.name + "_",
      transform: this.transform,
      url: this.url,
      loadJSON: false,
      type: this.type,
      props: this.props,
    });
    objectViewModel.AddRenderObject(copyLightObject);
  }
}

export default MetaLight;
