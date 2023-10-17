import { common_store } from "../stores/Common_Store";
import { objectViewModel } from "../view_models/Object_VM";
import canvasHistory_store from "../stores/CanvasHistory_Store";
import DeleteObjCommand from "../class/commands/CanvasObject/DeleteObjCommand";
import CSG from "../class/three-csg";
import * as THREE from "three";
import MetaObject from "../class/Studio/MetaObject";
import { object_store } from "../stores/Object_Store";
import { ObjectControllerVM } from "../view_models/ObjectController_VM";
import AddObjCommand from "../class/commands/CanvasObject/AddObjCommand";

const objectCopyCutPasteViewModel = {
  copy: () => {
    if (!common_store.isPreview && common_store.curCategory === "canvas") {
      if (objectViewModel.isObjectSelected) {
        objectViewModel.selectedObjects[0].UpdateTransform();
        objectViewModel.SetObjectClipBoard(objectViewModel.selectedObjects[0]);
      }
    }
  },

  paste: () => {
    if (!common_store.isPreview && common_store.curCategory === "canvas") {
      objectViewModel.objectClipBoard.Copy();
    }
  },

  cutAndPaste: () => {
    if (!common_store.isPreview && common_store.curCategory === "canvas") {
      if (objectViewModel.isObjectSelected) {
        objectViewModel.selectedObjects[0].UpdateTransform();
        objectViewModel.selectedObjects[0].Copy();
      }
    }
  },

  deleteOBJ: () => {
    if (!common_store.isPreview && common_store.curCategory === "canvas") {
      if (objectViewModel.isObjectSelected) {
        objectViewModel.selectedObjects[0].UpdateTransform();
        canvasHistory_store.execute(
          new DeleteObjCommand(
            objectViewModel.selectedObjects[0],
            objectViewModel.selectedObjects[0].objectId
          )
        );
      }
      common_store.changeMode_nonTrans("delete");
    }
  },

  deselectObject: () => {
    if (common_store.curCategory === "canvas") {
      if (objectViewModel.isObjectSelected) {
        objectViewModel.SetIsObjectSelected(false);
        objectViewModel.SetSelectedObjects(null, "tab");
      }
    }
  },
  booleanfunction: (editmode, basemetaobj, targetmetaobj) => {
    console.log(basemetaobj.mesh.geometry);
    let baseMesh;
    let targetMesh;
    const oribase = object_store.selectedObjects[1].mesh;
    const oritarget = object_store.selectedObjects[0].mesh;

    basemetaobj.mesh.traverse((child) => {
      if (basemetaobj.geometry === null && basemetaobj.editMesh === false) {
        if (
          child.position.x !== 0 ||
          child.position.y !== 0 ||
          child.position.z !== 0
        ) {
          oribase.position.set(
            child.position.x,
            child.position.y,
            child.position.z
          );
        }
        if (
          child.rotation.x !== 0 ||
          child.rotation.y !== 0 ||
          child.rotation.z !== 0
        ) {
          oribase.rotation.set(
            child.rotation.x,
            child.rotation.y,
            child.rotation.z
          );
        }
        if (child.scale.x !== 1 || child.scale.y !== 1 || child.scale.z !== 1) {
          oribase.scale.set(child.scale.x, child.scale.y, child.scale.z);
        }
      }
      if (child.isMesh) {
        baseMesh = child;
      }
    });
    targetmetaobj.mesh.traverse((child) => {
      if (targetmetaobj.geometry === null && targetmetaobj.editMesh === false) {
        if (
          child.position.x !== 0 ||
          child.position.y !== 0 ||
          child.position.z !== 0
        ) {
          oritarget.position.set(
            child.position.x,
            child.position.y,
            child.position.z
          );
        }
        if (
          child.rotation.x !== 0 ||
          child.rotation.y !== 0 ||
          child.rotation.z !== 0
        ) {
          oritarget.rotation.set(
            child.rotation.x,
            child.rotation.y,
            child.rotation.z
          );
        }
        if (child.scale.x !== 1 || child.scale.y !== 1 || child.scale.z !== 1) {
          oritarget.scale.set(child.scale.x, child.scale.y, child.scale.z);
        }
      }
      if (child.isMesh) {
        targetMesh = child;
      }
    });

    const baseobj = new THREE.Mesh(baseMesh.geometry, baseMesh.material);
    const targetobj = new THREE.Mesh(targetMesh.geometry, targetMesh.material);
    baseobj.position.set(
      oribase.position.x,
      oribase.position.y,
      oribase.position.z
    );
    baseobj.rotation.set(
      oribase.rotation.x,
      oribase.rotation.y,
      oribase.rotation.z
    );
    baseobj.scale.set(oribase.scale.x, oribase.scale.y, oribase.scale.z);
    targetobj.position.set(
      oritarget.position.x,
      oritarget.position.y,
      oritarget.position.z
    );
    targetobj.rotation.set(
      oritarget.rotation.x,
      oritarget.rotation.y,
      oritarget.rotation.z
    );
    targetobj.scale.set(
      oritarget.scale.x,
      oritarget.scale.y,
      oritarget.scale.z
    );

    baseobj.updateMatrix();
    const bspA = CSG.fromMesh(baseobj);
    targetobj.updateMatrix();
    const bspB = CSG.fromMesh(targetobj);
    const bspResult = bspA[editmode](bspB);

    const meshResult = CSG.toMesh(bspResult, baseobj.matrix, baseobj.material);

    const transform = {
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Vector3(0, 0, 0),
      scale: new THREE.Vector3(1, 1, 1),
    };

    transform.position.set(
      meshResult.position.x,
      meshResult.position.y,
      meshResult.position.z
    );
    transform.rotation.set(
      meshResult.rotation.x,
      meshResult.rotation.y,
      meshResult.rotation.z
    );
    transform.scale.set(
      meshResult.scale.x,
      meshResult.scale.y,
      meshResult.scale.z
    );

    meshResult.position.set(0, 0, 0);
    meshResult.rotation.set(0, 0, 0);
    meshResult.scale.set(1, 1, 1);
    // renderingContext_store.scene.add(meshResult)
    const tempObject = new MetaObject(meshResult, {
      name: "new",
      type: "Object",
    });
    canvasHistory_store.execute(
      new AddObjCommand(tempObject, tempObject.objectId)
    );

    // tempObject.Init(meshResult);
    const euler = new THREE.Euler(
      transform.rotation.x,
      transform.rotation.y,
      transform.rotation.z
    );
    tempObject.SetProps("position", transform.position);
    tempObject.SetProps("rotation", euler);
    tempObject.SetProps("scale", transform.scale);
    meshResult.name = "new";

    basemetaobj.Delete();
    targetmetaobj.Delete();
  },
  latticefunction: () => {
    const target_obj = object_store.selectedObjects[0];
    ObjectControllerVM.Lock(target_obj);
    common_store.setLattice(controller);
  },
  deletelatticefunction: () => {
    common_store.lattice.changeGeometry();
    common_store.lattice.view.clearObjects();
    ObjectControllerVM.Lock(common_store.lattice.target_obj);
    ObjectControllerVM.Select(common_store.lattice.target_obj);
    common_store.setLattice(null);
  },
};

export { objectCopyCutPasteViewModel };
