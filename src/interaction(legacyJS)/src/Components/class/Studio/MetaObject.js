/* eslint-disable array-callback-return */
import { action, makeObservable, observable } from "mobx";
import * as THREE from "three";

import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils";
import { data_store } from "../../stores/Data_Store";
import canvasHistory_store from "../../stores/CanvasHistory_Store";
import MetaClass from "./MetaClass";
import { objectViewModel } from "../../view_models/Object_VM";
import AddObjCommand from "../commands/CanvasObject/AddObjCommand";
import { Material_store } from "../../stores/Material_Store";

class MetaObject extends MetaClass {
  materialList = {}; //object를 구성하고 있는 material들 저장
  materialProps = null;
  materialCount = 0;
  materialIndex = -1;
  mixer = null;
  animationList = [];
  loadJSON = false;
  editMesh = false;
  generalSpeed = 1;

  constructor(object, arg) {
    super(object, arg);
    makeObservable(this, {
      materialList: observable,
      materialProps: observable,
      animationList: observable,
      generalSpeed: observable,
      parentId: observable,
      childrenIds: observable,
      SetGroupParent: action,
      SetAnimationSpeed: action,
      SetAniGeneralSpeed: action,
    });
    this.materialIndex = arg.materialIndex;
    this.InitProps();
    if (this.mesh !== null) {
      this.InitAnimationList(this.mesh);
      this.mesh.userData["name"] = this.mesh.name;
      if (this.mesh.isMesh && this.mesh.material.opacity !== 0) {
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.material.envMapIntensity = scene_store.envMapIntensity;

        this.InitMaterialProps(this.mesh);
      }
    }
  }
  InitClass(metaData, materialLength) {
    super.InitClass();
    let materialLen = materialLength ?? 0;

    for (const child of this.mesh.children) {
      materialLen = this.CreateChildObject(child, metaData, materialLen);
    }
    if (typeof materialLength !== "undefined") return materialLen;
    else {
      this.materialLength = materialLen;
    }
  }
  CreateChildObject(child, metaData, materialLength) {
    const type = child.type;

    let materialIndex = -1;
    if (child.isMesh) {
      materialIndex = materialLength;
      materialLength++;
    }
    const childMetaObject = new MetaObject(child, {
      name: child.name,
      type: type,
      metaData: metaData,
      materialIndex: materialIndex,
    });

    this.childrenIds.push(childMetaObject.objectId);
    childMetaObject.SetGroupParent(this.objectId);
    materialLength = childMetaObject.InitClass(metaData, materialLength);

    return materialLength;
  }
  async ReConstructor(
    mode,
    {
      props,
      materialProps,
      animationList,
      generalSpeed,
      parentId,
      childrenIds,
      materialIndicesMapping,
    }
  ) {
    //super.ReConstructor({ parentId: parentId, childrenIds: childrenIds });

    for (const child of this.mesh.children) {
      const childObject = objectViewModel.GetMetaObjectByObjectId(child.uuid);
      const childData = {
        props: props,
        materialProps: materialProps,
        childrenIds: childrenIds,
        parentId: parentId,
        materialIndicesMapping: materialIndicesMapping,
      };
      childObject.ReConstructor(mode, childData, childObject.materialIndex);
    }

    await this.ApplyMaterialSavedData(materialIndicesMapping);

    if (props) {
      Object.keys(props).map((prop) => {
        this.SetProps(prop, props[prop]);
      });
    }

    if (animationList && animationList.length > 0) {
      this.InitAnimationList(this.mesh);
      animationList.map((ani, index) => {
        if (ani.isPlay) {
          const value = { name: ani.name, weight: ani.weight };
          this.SetAnimationProps(value);
          this.SetAnimationSpeed({ name: ani.name, value: ani.timeScale });
        }
      });
    }
    if (typeof generalSpeed !== "undefined") {
      this.SetAniGeneralSpeed(generalSpeed);
    }

    if (this.editMesh === true) {
      this.mesh.traverse((child) => {
        child.position.set(0, 0, 0);
        child.rotation.set(0, 0, 0);
        child.scale.set(1, 1, 1);
      });
    }
  }

  Copy() {
    ObjectControllerVM.DeSelectAll();

    const cloneObject = SkeletonUtils.clone(this.mesh);

    cloneObject.traverse((node) => {
      if (node.isMesh) {
        node.material = node.material.clone();
      }
    });

    const copiedObject = new MetaObject(cloneObject, {
      objectId: null,
      name: this.name + "_",
      blobGlb: this.blobGlb,
      url: this.url,
      loadJSON: false,
      type: this.type,
    });

    canvasHistory_store.execute(
      new AddObjCommand(copiedObject, copiedObject.objectId)
    );
  }

  async toJson(mode, topJsonData) {
    //Json 변환 전 처리

    if (this.blobGlb && mode === "save") {
      await this.ExportGLB();
    }

    this.exportMaterialProps(this.objectId);
    const animationListJson = [];
    if (animationListJson) {
      this.animationList.map((ani, _index) => {
        animationListJson.push({
          name: ani.name,
          timeScale: ani.timeScale,
          weight: ani.weight,
          isPlay: ani.isPlay,
        });
      });
    }
    const parentJsonDatas = await super.toJson(mode);

    return {
      ...parentJsonDatas,
      ...{
        animationList: animationListJson,
        generalSpeed: this.generalSpeed,
        parentId: this.parentId,
        childrenIds: this.childrenIds,
        materialIndicesMapping: this.materialIndicesMapping,
      },
    };
  }

  SetProps(prop, value) {
    switch (prop) {
      case "Animation":
        this.SetAnimationProps(value);
        break;
      case "AnimationSpeed":
        this.SetAnimationSpeed(value);
        break;
      case "AnimationGeneralSpeed":
        this.SetAniGeneralSpeed(value);
        break;
      default:
        super.SetProps(prop, value);
        break;
    }
  }

  InitMaterialProps(child) {
    if (Array.isArray(child["material"])) {
      //여러개의 material

      for (const material of child["material"]) {
        const uuid = material["uuid"];

        const name =
          material.name !== ""
            ? material.name
            : "material" + this.materialCount++;
        this.materialProps = {
          ...this.materialProps,
          [uuid]: {
            name: name,
            material: material,
            originMaterial: material,
            mesh: child,
            meshName: child.name,
          },
        };
        this.materialList = { ...this.materialList, [name]: material };
        for (const prop in data_store["materialProps"]) {
          this.materialProps[uuid] = {
            ...this.materialProps[uuid],
            [prop]: material[prop],
          };
        }
      }
    } else {
      const uuid = child["material"]["uuid"];
      const material = child["material"];
      const name =
        material.name !== ""
          ? material.name
          : "material" + this.materialCount++;
      material.name = name;
      this.materialProps = {
        ...this.materialProps,
        [uuid]: {
          type: material.type,
          name: name,
          material: material,
          originMaterial: material,
          mesh: child,
          meshName: child.name,
          index: this.materialIndex ? this.materialIndex : 0,
          change: false,
        },
      };

      this.materialList = { ...this.materialList, [name]: material };
      for (const prop in data_store["materialProps"]) {
        let value = material[prop];
        if (prop === "color") {
          value = "#" + value.getHexString();
        }
        this.materialProps[uuid] = {
          ...this.materialProps[uuid],
          [prop]: value,
        };
      }
    }
  }

  SetMaterialProps(uuid, prop, value) {
    const object = this.materialProps[uuid]["material"];
    const mesh = this.materialProps[uuid]["mesh"];

    switch (prop) {
      case "opacity":
        object[prop] = value;
        object["transparent"] = true;

        this.materialProps[uuid][prop] = value;

        this.materialProps = { ...this.materialProps };
        break;
      case "Template":
        this.ChangeMaterial(uuid, mesh, value);

        break;
      default:
        if (typeof object[prop] !== "undefined") {
          if (typeof object[prop].set === "function") {
            object[prop].set(value);
          } else object[prop] = value;
          this.materialProps = {
            ...this.materialProps,
            [uuid]: { ...this.materialProps[uuid], [prop]: value },
          };
        }

        break;
    }
    this.materialProps[uuid]["change"] = true;
  }
  exportMaterialProps(objectId) {
    const metaObject = objectViewModel.GetMetaObjectByObjectId(objectId);
    for (const childId of metaObject.childrenIds) {
      this.exportMaterialProps(childId);
    }
    if (metaObject.materialProps) {
      Object.keys(metaObject.materialProps).map((uuid) => {
        if (metaObject.materialProps[uuid]["change"]) {
          const _material = metaObject.materialProps[uuid]["material"].clone();
          this.convertColorHex(_material);
          Material_store.metaMaterials = {
            ...Material_store.metaMaterials,
            [Material_store.materialIndex]: {
              ..._material,
            },
          };
          const materialIndex = metaObject.materialProps[uuid]["index"];

          this.materialIndicesMapping[materialIndex] =
            Material_store.materialIndex;

          Material_store.materialIndex++;
        }
      });
    }
  }

  convertColorHex(material) {
    // rgb -> hex
    Object.keys(material).map((prop) => {
      if (material[prop]?.isColor) {
        material[prop] = "#" + material[prop].getHexString();
      }
    });
  }
  async ApplySavedMaterialTemplateData(materialName) {
    // Material Template 적용
    await Promise.all(
      data_store.mat_tex_list.map(async (items, index) => {
        if (items[1] === materialName) {
          const _materialTemplate =
            await loadersViewModel.GetMaterialTextureByName(materialName);
          this.ChangeMaterial(
            this.mesh["material"].uuid,
            this.mesh,
            _materialTemplate.clone()
          );
        }
      })
    );
  }
  async ApplyMaterialSavedData(materialIndicesMapping) {
    const mateiral =
      Material_store.metaMaterials[materialIndicesMapping[this.materialIndex]];
    if (mateiral && this.mesh.isMesh && this.mesh.material.opacity !== 0) {
      if (mateiral.userData?.template) {
        // Material Template 확인
        await this.ApplySavedMaterialTemplateData(mateiral.name); //Material Template
      }
      const materialProps =
        Material_store.metaMaterials[
          materialIndicesMapping[this.materialIndex]
        ];
      for (const prop in data_store["materialProps"]) {
        this.SetMaterialProps(
          this.mesh["material"].uuid,
          prop,
          materialProps[prop]
        );
      }
    }
  }
  InitAnimationList(child) {
    if (child.animations.length !== 0) {
      this.animationList = [];
      this.mixer = new THREE.AnimationMixer(child);

      for (var i = 0; i < child.animations.length; i++) {
        if (Array.isArray(child.animations[i])) {
          for (const animation of child.animations[i]) {
            this.animationAction = this.mixer.clipAction(animation);
            this.animationAction.play();
            this.animationAction.weight = 0;

            this.animationList = [
              ...this.animationList,
              {
                animationAction: this.animationAction,
                name: animation.name,
                timeScale: this.animationAction.timeScale,
                weight: 1,
                isPlay: false,
                uuid: animation.uuid,
              },
            ];
          }
        } else {
          this.animationAction = this.mixer.clipAction(child.animations[i]);
          this.animationAction.play();
          this.animationAction.weight = 0;
          this.animationList = [
            ...this.animationList,
            {
              animationAction: this.animationAction,
              name: child.animations[i].name,
              timeScale: this.animationAction.timeScale,
              weight: 1,
              isPlay: false,
              uuid: child.animations[i].uuid,
            },
          ];
        }
      }
    }
  }

  SetAnimationProps(value) {
    if (typeof this.animationAction !== "undefined") {
      this.animationList.map((ani, index) => {
        if (
          value.name === this.animationList[index].name &&
          value.weight !== ani.animationAction.weight
        ) {
          ani.animationAction.weight = value.weight;
          this.animationList[index].weight = value.weight;
          console.log(ani.animationAction.weight);
          ani.isPlay = true;
        } else {
          ani.animationAction.weight = 0;
          ani.isPlay = false;
        }
      });
      this.animationList = [...this.animationList];
    }
  }

  SetAnimationInteraction(value) {
    this.animationList.map((ani, _index) => {
      if (typeof ani.animationAction !== "undefined") {
        if (value.name === ani.name) {
          ani.animationAction.weight = value.weight;
          ani.weight = value.weight;
          ani.isPlay = true;
        }
      }
    });
    this.animationList = [...this.animationList];
  }

  GetCurrentAnimation() {
    const playingAnimationIndex = this.animationList.findIndex(
      (animation) => animation.isPlay
    );

    return playingAnimationIndex !== -1 ? playingAnimationIndex : null;
  }
  GetCurrentAnimationPropsByIndex(index, prop) {
    if (this.animationList.length !== 0 && index !== null) {
      console.log(this.animationList[index]);
      return this.animationList[index][prop];
    }
  }
  SetAnimationSpeed({ name, value }) {
    if (typeof this.animationAction !== "undefined") {
      for (let i = 0; i < this.animationList.length; i++) {
        if (name === this.animationList[i].name) {
          this.animationList[i].timeScale = value;
          this.animationList[i].animationAction.timeScale =
            value * this.generalSpeed;
        }
      }
    }
  }
  SetAniGeneralSpeed(value) {
    this.generalSpeed = value;

    if (typeof this.animationAction !== "undefined") {
      this.animationList.map((ani, index) => {
        ani.animationAction.timeScale =
          this.animationList[index].timeScale * this.generalSpeed;
      });
      this.animationList = [...this.animationList];
    }
  }

  GetMaterialByUuid(uuid) {
    return this.materialProps[uuid]["material"];
  }

  GetMaterialPropsByUuid(uuid) {
    return this.materialProps[uuid];
  }

  ChangeMaterial(uuid, mesh, material) {
    const newMateiralName = material.name;
    this.mesh.traverse((child) => {
      if (child.isMesh) {
        if (child.material["uuid"] === uuid) {
          child.material = material;
          child.material["uuid"] = uuid;
        }
      }
    });

    this.materialProps[uuid].material = material;

    this.materialProps[uuid] = {
      ...this.materialProps[uuid],
      type: material.type,
      materTemp: newMateiralName,
    };

    for (const prop in data_store["materialProps"]) {
      if (prop !== "uuid" && prop !== "name") {
        let propValue = material[prop];
        if (prop === "color") {
          propValue = "#" + propValue.getHexString();
        }
        this.materialProps[uuid] = {
          ...this.materialProps[uuid],
          [prop]: propValue,
        };
      }
    }
    this.materialProps = { ...this.materialProps };
  }
}

export default MetaObject;
