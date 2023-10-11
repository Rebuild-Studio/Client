import React from "react";
import * as THREE from "three";
import storeContainer from "../stores/storeContainer";
import { Loader } from "../class/Loader";
import MetaObject from "../class/Studio/MetaObject";

import CSG from "../class/three-csg";
import { controllerBar_store } from "../stores/ControllerBar_Store";
import { objectViewModel } from "./Object_VM";
import { ObjectControllerVM } from "./ObjectController_VM";

export default function EventFunctions_VM() {
  const {
    common_store,
    object_store,
    undo_store,
    loader_store,
    renderingContext_store,
  } = storeContainer;

  const DoubleClickThreshold = 200; // 200ms

  const ImportImg = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", async function () {
      common_store.setUploadedImg(input.files);
      const imageForm = new FormData();
      //const blob = new Blob([new Uint8Array(input.files[0].result)], {type: input.files[0].type });

      imageForm.append("image", await fileToBlob(input.files[0]), "test.png");
      const res = await TransferData.PostIMG(imageForm);
      createByImage(res.data.data);
    });

    input.click(); // open
  };
  const ImportApart = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", async function () {
      common_store.setUploadedImg(input.files);
      const imageForm = new FormData();
      //const blob = new Blob([new Uint8Array(input.files[0].result)], {type: input.files[0].type });

      imageForm.append("image", await fileToBlob(input.files[0]), "test.png");
      const res = await TransferData.PostApart(imageForm);
      createByApart(res.data.data);
    });

    input.click(); // open
  };
  const fileToBlob = async (file) =>
    new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type });
  const ImportGLB = async () => {
    var loader = new Loader(false);
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".glb";
    input.addEventListener("change", function () {
      loader.loadFiles(input.files);
    });
    input.click(); // open
  };

  const DropEventListener = React.useCallback((e) => {
    e.preventDefault();
    var loader = new Loader();

    if (e.dataTransfer.types[0] === "text/plain") return; // Outliner drop

    if (e.dataTransfer.items) {
      // DataTransferItemList supports folders

      loader.loadItemList(e.dataTransfer.items);
    } else {
      loader.loadFiles(e.dataTransfer.files);
    }
  });

  const handleOnClick = React.useCallback((e) => {
    if (
      common_store.onMouseDownPosition.distanceTo(
        common_store.onMouseUpPosition
      ) > 0.003
    ) {
      return;
    }
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / (window.innerHeight + 78)) * 2 + 1
    );
    raycaster.setFromCamera(mouse, renderingContext_store.camera);
    const intersects = raycaster.intersectObjects(
      object_store.raycastObjects,
      false
    );
    if (intersects.length > 0) {
      var intersect = null;
      if (intersects[0].object.name === "plane") {
        if (intersects.length === 1) {
          ObjectControllerVM.DeSelectAll();
          return;
        }
        intersect = intersects[1];
      } else {
        intersect = intersects[0];
      }

      if (e.button === 2 && object_store.selectedObjects.length > 1) {
        return;
      }
      const parentObject = findTopLevelParent(intersect.object);
      const metaObject = objectViewModel.GetMetaObjectByMeshUuid(
        parentObject.uuid
      );
      if (!metaObject.props["lock"]) ObjectControllerVM.Select(metaObject);
    }
  }, []);

  function findTopLevelParent(object) {
    let topLevelParent = object;
    const selectedObjects = object_store.selectedObjects;
    const scene = renderingContext_store.scene;

    // 최상위 계층 먼저 선택 이후 순차적으로 내려감
    while (topLevelParent.parent !== scene) {
      if (
        selectedObjects.length !== 0 &&
        selectedObjects[0].mesh === topLevelParent.parent
      ) {
        break;
      }
      topLevelParent = topLevelParent.parent;
    }

    // 최하위 계층 먼저 선택 이후 최상위 계층부터 순차적으로 내려감
    // while (
    //   topLevelParent.parent !== renderingContext_store.scene &&
    //   object_store.selectedObjects.length !== 0 &&
    //   object_store.selectedObjects[0].mesh !== topLevelParent.parent
    // ) {
    //   topLevelParent = topLevelParent.parent;
    // }
    return topLevelParent;
  }

  const onMouseUp = React.useCallback((e) => {
    e.preventDefault();
    const mouse = new THREE.Vector2();
    mouse.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / (window.innerHeight + 78)) * 2 + 1
    );
    common_store.setOnMouseUpPosition(mouse);
    handleOnClick(e);
    document.removeEventListener("mouseup", onMouseUp);
  });
  const onMouseDown = React.useCallback((e) => {
    e.preventDefault();
    if (common_store.curCategory === "canvas") {
      const mouse = new THREE.Vector2();
      mouse.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / (window.innerHeight + 78)) * 2 + 1
      );
      common_store.setOnMouseDownPosition(mouse);
      document.addEventListener("mouseup", onMouseUp);
    }
  });

  function onItemMove(event) {
    const raycaster = new THREE.Raycaster();
    if (common_store.isMoveMode) {
      if (!objectViewModel.isObjectSelected) return;
      var target = object_store.selectedObjects[0];
      const mouse = new THREE.Vector2();
      event.preventDefault();
      mouse.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / (window.innerHeight + 78)) * 2 + 1
      );
      raycaster.setFromCamera(mouse, renderingContext_store.camera);

      const intersects = raycaster.intersectObjects(
        controllerBar_store.attachMode
          ? object_store.raycastObjects
          : [common_store.plane],
        false
      );
      if (intersects.length > 0) {
        const intersect = intersects[0];
        if (!controllerBar_store.normalMode) {
          const tempTransform = new THREE.Group();
          const normalVector = intersect.face.normal.clone();
          normalVector.applyQuaternion(intersect.object.quaternion);
          const up = new THREE.Vector3(0, 1, 0);
          let axis;
          if (normalVector.y === 1 || normalVector.y === -1) {
            axis = new THREE.Vector3(1, 0, 0);
          } else {
            axis = up.cross(normalVector);
          }
          const radians = up.angleTo(normalVector);
          tempTransform.rotateOnWorldAxis(axis, radians);
          target.mesh.rotation.copy(tempTransform.rotation);
        }
        if (controllerBar_store.magneticMode) {
          target.mesh.position.set(
            Math.round(intersect.point.x * 2) / 2,
            Math.round(intersect.point.y * 2) / 2,
            Math.round(intersect.point.z * 2) / 2
          );
        } else {
          if (controllerBar_store.attachMode) {
            const subVec = BboxCenterToPointer(target, intersect.point);
            target.mesh.position.subVectors(target.mesh.position, subVec);
          } else {
            target.mesh.position.copy(intersect.point);
          }
        }
        objectViewModel.SetProps("position", target.mesh.position);
      }
    }
  }
  function BboxCenterToPointer(object, point) {
    const pVector = new THREE.Vector3();
    pVector.copy(object.pivotVector.clone());
    pVector.applyEuler(object.mesh.rotation);
    pVector.multiply(object.mesh.scale);
    pVector.add(object.mesh.position);

    const returnVector = new THREE.Vector3().subVectors(pVector, point);
    return returnVector;
  }
  function findClosestVertexToPoint(object, point) {
    // Initialize the closest vertex and distance
    let closestVertex = null;
    let closestDistance = Infinity;
    const positionAttribute = object.geometry.getAttribute("position");

    const vertex = new THREE.Vector3();

    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i); // read vertex
      object.localToWorld(vertex);

      const distanceToPoint = vertex.distanceTo(point);

      // If the distance is smaller than the current closest distance, update the closest vertex
      if (distanceToPoint < closestDistance) {
        closestVertex = vertex;
        closestDistance = distanceToPoint;
      }
    }

    const vecToVertex = new THREE.Vector3().subVectors(closestVertex, point);
    // Return the closest vertex
    return vecToVertex;
  }
  function createByApart(points) {
    const blankgeometry = new THREE.BoxGeometry(1, 1, 1);
    const blankmaterial = new THREE.MeshPhysicalMaterial({ color: 0xffffff });
    const apartObject = new THREE.Mesh(blankgeometry, blankmaterial);
    apartObject.material.visible = false;

    const WallObject = new THREE.Mesh(blankgeometry, blankmaterial);
    WallObject.material.visible = false;

    const DoorObject = new THREE.Mesh(blankgeometry, blankmaterial);
    DoorObject.material.visible = false;
    const WindowObject = new THREE.Mesh(blankgeometry, blankmaterial);
    WindowObject.material.visible = false;

    const DoorCollidergeo = new THREE.BoxGeometry(1.5, 5, 1);
    const DoorCollider = new THREE.Mesh(
      DoorCollidergeo,
      new THREE.MeshStandardMaterial({ color: "blue" })
    );
    const DoorColliderObject = new THREE.Mesh(blankgeometry, blankmaterial);
    DoorColliderObject.material.visible = false;

    const WindowCollidergeo = new THREE.BoxGeometry(3, 3, 2);
    const WindowCollider = new THREE.Mesh(
      WindowCollidergeo,
      new THREE.MeshStandardMaterial({ color: "red" })
    );

    const WindowColliderObject = new THREE.Mesh(blankgeometry, blankmaterial);
    WindowColliderObject.material.visible = false;
    let wallmaterial, floormaterial;
    let doornumber = 0;

    for (const i of Object.keys(points)) {
      let shape;
      let geometry;
      //console.log(i)
      const data_array = points[i.toString()];

      if (i.toString() === "floor") {
        const loader = new THREE.TextureLoader();
        const floormap = loader_store.apartTexture[0].clone();
        const roughnessmap = loader_store.apartTexture[2].clone();
        const normalmap = loader_store.apartTexture[1].clone();
        floormap.wrapS = THREE.RepeatWrapping;
        floormap.wrapT = THREE.RepeatWrapping;
        // floormap.repeat.set(0.0001,0.001)
        floormap.repeat.set(0.1, 0.1);
        roughnessmap.wrapS = THREE.RepeatWrapping;
        roughnessmap.wrapT = THREE.RepeatWrapping;
        roughnessmap.repeat.set(0.1, 0.1);
        normalmap.wrapS = THREE.RepeatWrapping;
        normalmap.wrapT = THREE.RepeatWrapping;
        normalmap.repeat.set(0.1, 0.1);
        floormaterial = new THREE.MeshStandardMaterial({
          map: floormap,
          normalMap: normalmap,
          roughnessMap: roughnessmap,
        });

        shape = new THREE.Shape();
        shape.moveTo(data_array[0], data_array[1]);
        for (let step = 0; step < data_array.length - 2; step = step + 2) {
          shape.lineTo(data_array[step], data_array[step + 1]);
          //console.log(step)
        }
        shape.lineTo(data_array[0], data_array[1]);
        const extrudeSettings = {
          steps: 1,
          depth: 1,
          bevelEnabled: false,
          bevelThickness: 1,
          bevelSize: 1,
          bevelOffset: 0,
          bevelSegments: 1,
        };

        geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

        const mesh = new THREE.Mesh(geometry, floormaterial);

        mesh.scale.set(0.05, 0.05, 1);
        mesh.position.z += 5;
        //mesh.material = floormaterial
        apartObject.attach(mesh);
      }

      if (
        data_array[0][8] === "Wall" ||
        data_array[0][8] === "Window" ||
        data_array[0][8] === "Door"
      ) {
        shape = new THREE.Shape();
        shape.moveTo(data_array[0][0], data_array[0][1]);
        for (let step = 0; step < 8; step = step + 2) {
          shape.lineTo(data_array[0][step], data_array[0][step + 1]);
        }
        shape.lineTo(data_array[0][0], data_array[0][1]);

        const extrudeSettings = {
          steps: 1,
          depth: 100,
          bevelEnabled: false,
          bevelThickness: 1,
          bevelSize: 1,
          bevelOffset: 0,
          bevelSegments: 1,
        };

        geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

        const mesh = new THREE.Mesh(geometry, wallmaterial);

        mesh.scale.set(0.05, 0.05, 0.05);

        const loader = new THREE.TextureLoader();
        const wallmap = loader_store.apartTexture[3].clone();
        const roughnessmap = loader_store.apartTexture[5].clone();
        const normalmap = loader_store.apartTexture[4].clone();
        wallmap.wrapS = THREE.RepeatWrapping;
        wallmap.wrapT = THREE.RepeatWrapping;
        wallmap.repeat.set(0.01, 0.1);
        roughnessmap.wrapS = THREE.RepeatWrapping;
        roughnessmap.wrapT = THREE.RepeatWrapping;
        roughnessmap.repeat.set(0.01, 0.1);
        normalmap.wrapS = THREE.RepeatWrapping;
        normalmap.wrapT = THREE.RepeatWrapping;
        normalmap.repeat.set(0.01, 0.1);
        wallmaterial = new THREE.MeshStandardMaterial({
          map: wallmap,
          normalMap: normalmap,
          roughnessMap: roughnessmap,
        });
        mesh.material = wallmaterial;
        WallObject.attach(mesh);
      }

      if (data_array[0][8] === "Door") {
        doornumber++;
        const doormesh = loader_store.apartObj[0].clone();
        const loader = new THREE.TextureLoader();
        const basemap = loader_store.apartTexture[6].clone();
        const roughnessmap = loader_store.apartTexture[7].clone();
        doormesh.children[0].material.map = basemap;
        doormesh.children[0].material.roughnessMap = roughnessmap;
        doormesh.children[0].material.metalness = 0;
        const doorcollidermesh = DoorCollider.clone();
        //console.log(doormesh)
        DoorObject.attach(doormesh);
        DoorColliderObject.attach(doorcollidermesh);
        //doormesh.children[0].scale.set(0.01,0.2,0.01)
        doormesh.children[0].scale.set(1.5, 2, 8);
        if (
          Math.abs(data_array[0][0] - data_array[0][2]) >
          Math.abs(data_array[0][1] - data_array[0][3])
        ) {
          doormesh.children[0].rotateX(3.14 / 2);
          doorcollidermesh.rotateX(3.14 / 2);
          //doormesh.children[0].position.set((data_array[0][0]+data_array[0][2])/40,(data_array[0][1]+data_array[0][3])/40,3)
          doormesh.children[0].position.set(
            (data_array[0][0] + data_array[0][6]) / 40 - 0.25,
            data_array[0][7] / 20,
            0.5
          );
          doorcollidermesh.position.set(
            (data_array[0][0] + data_array[0][6]) / 40 + 0.45,
            data_array[0][7] / 20 - 0.1,
            3
          );
        }
        if (
          Math.abs(data_array[0][0] - data_array[0][2]) <
          Math.abs(data_array[0][1] - data_array[0][3])
        ) {
          doormesh.children[0].rotateX(3.14 / 2);
          doormesh.children[0].rotateY(3.14 / 2);
          doorcollidermesh.rotateX(3.14 / 2);
          doorcollidermesh.rotateY(3.14 / 2);
          doormesh.children[0].position.set(
            (data_array[0][0] + data_array[0][6]) / 40 + 0.2,
            data_array[0][7] / 20 - 2,
            0.5
          );
          doorcollidermesh.position.set(
            (data_array[0][0] + data_array[0][6]) / 40,
            data_array[0][7] / 20 - 1.3,
            3
          );
        }
      }
      if (data_array[0][8] === "Window") {
        const windowmesh = loader_store.apartObj[1].clone();
        const windowcollidermesh = WindowCollider.clone();
        // console.log(windowmesh)
        // const loader = new THREE.TextureLoader();
        // let basemap =loader.load('Icons/Item/wood_BaseColor.png', undefined, undefined, function(err) {
        //   alert('Error');
        // });
        // let roughnessmap =loader.load('Icons/Item/wood_Roughness.png', undefined, undefined, function(err) {
        //   alert('Error');
        // });
        // windowmesh.children[0].material.map = basemap;
        // windowmesh.children[0].material.roughnessMap = roughnessmap;
        // windowmesh.children[0].material.metalness = 0

        WindowObject.attach(windowmesh);
        WindowColliderObject.attach(windowcollidermesh);
        windowmesh.children[0].scale.set(1.2, 2, 5);
        if (
          Math.abs(data_array[0][0] - data_array[0][2]) >=
          Math.abs(data_array[0][1] - data_array[0][3])
        ) {
          //console.log("Window")
          windowmesh.children[0].rotateX(3.14 / 2);
          windowcollidermesh.rotateX(3.14 / 2);
          windowmesh.name = "Window" + i.toString();
          //doormesh.children[0].position.set((data_array[0][0]+data_array[0][2])/40,(data_array[0][1]+data_array[0][3])/40,3)
          windowmesh.children[0].position.set(
            (data_array[0][0] + data_array[0][6]) / 40 - 0.5,
            (data_array[0][1] + data_array[0][3]) / 40 - 0.2,
            0.5
          );
          windowcollidermesh.position.set(
            (data_array[0][0] + data_array[0][6]) / 40 + 1,
            data_array[0][7] / 20 + 0.1,
            2
          );
        }
        if (
          Math.abs(data_array[0][0] - data_array[0][2]) <
          Math.abs(data_array[0][1] - data_array[0][3])
        ) {
          //console.log("Window")
          windowmesh.children[0].rotateX(3.14 / 2);
          windowmesh.children[0].rotateY(3.14 / 2);
          windowcollidermesh.rotateX(3.14 / 2);
          windowcollidermesh.rotateY(3.14 / 2);

          windowmesh.children[0].position.set(
            (data_array[0][0] + data_array[0][6]) / 40,
            (data_array[0][1] + data_array[0][3]) / 40 - 0.5,
            2.5
          );
          windowcollidermesh.position.set(
            (data_array[0][0] + data_array[0][6]) / 40,
            data_array[0][7] / 20 - 3,
            2
          );
        }
      }
      // i+=1;
    }

    for (let wind = 0; wind < WallObject.children.length; wind++) {
      WallObject.children[wind].updateMatrix();
      const bspA = CSG.fromMesh(WallObject.children[wind]);
      let bspResult;
      let bspTemp;
      bspTemp = bspA;
      bspResult = bspA;

      for (let dind = 0; dind < DoorColliderObject.children.length; dind++) {
        DoorColliderObject.children[dind].updateMatrix();
        const bspB = CSG.fromMesh(DoorColliderObject.children[dind]);
        bspResult = bspTemp["subtract"](bspB);
        bspTemp = bspResult;
      }
      for (let dind = 0; dind < WindowColliderObject.children.length; dind++) {
        WindowColliderObject.children[dind].updateMatrix();
        const bspB = CSG.fromMesh(WindowColliderObject.children[dind]);
        bspResult = bspTemp["subtract"](bspB);
        bspTemp = bspResult;
      }
      const meshResult = CSG.toMesh(
        bspResult,
        WallObject.children[wind].matrix,
        WallObject.children[wind].material
      );
      apartObject.attach(meshResult);
    }

    //WindowObject.position.z -=3

    apartObject.attach(DoorObject);
    apartObject.attach(WindowObject);
    // apartObject.attach(DoorColliderObject)
    // apartObject.attach(WindowColliderObject)
    apartObject.rotateX(3.14 / 2);
    apartObject.position.y += 1.5;
    apartObject.position.x -= 5;
    apartObject.position.z -= 4;
    apartObject.scale.set(0.25, 0.25, 0.25);
    apartObject.updateMatrix();
    //common_store.scene.add(apartObject)
    const scene = renderingContext_store.scene;
    const transform = null;
    var tempObject = new MetaObject(
      null,
      scene.name,
      null,
      null,
      null,
      false,
      "Object"
    );
    tempObject.Init(apartObject);
    // objectViewModel.AddMetaObject(tempObject);
    var data = {
      type: "add",
      objectId: tempObject.objectId,
      name: DoorObject,
      transform: tempObject.transform,
      group: tempObject.mesh,
      blobGlb: null,
      url: null,
    };

    //undo_store.AddUnDoCommand(tempObject, data, addUndo, addRedo);
  }
  function createByImage(points) {
    let _midx = 0;
    let _midy = 0;
    let _midlen = 0;
    for (var i = 0; i < 50; i++) {
      if (points[i.toString()] !== undefined) {
        let __midx = 0;
        let __midy = 0;

        const p = points[i.toString()][0];

        if (p["point"].length > 0) {
          /////
          for (const point of p["point"]) {
            __midx += point[0];
            __midy += point[1];
            _midlen += 1;
          }
        }
        _midx += __midx;
        _midy += __midy;
      }
    }
    _midx = _midx / _midlen;
    _midy = _midy / _midlen;
    //const points = [[0,0],[0,2],[1,1]]
    for (let i = 0; i < 50; i++) {
      if (points[i.toString()] !== undefined) {
        let midx = 0;
        let midy = 0;
        const shape = new THREE.Shape();
        let geometry;
        const p = points[i.toString()][0];
        const colorstring =
          "rgb(" +
          p["rgb"][2].toString() +
          "," +
          p["rgb"][1].toString() +
          "," +
          p["rgb"][0].toString() +
          ")";
        const color = new THREE.Color(colorstring);

        if (p["point"].length > 0) {
          /////
          for (const point of p["point"]) {
            midx += point[0];
            midy += point[1];
          }
          midx = midx / p["point"].length;
          midy = midy / p["point"].length;
          shape.moveTo(p["point"][0][0] - midx, p["point"][0][1] - midy);
          for (const point of p["point"]) {
            shape.lineTo(point[0] - midx, point[1] - midy);
          }
          shape.lineTo(p["point"][0][0] - midx, p["point"][0][1] - midy);

          const extrudeSettings = {
            steps: 1,
            depth: 4,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 1,
          };

          geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        }

        const material = new THREE.MeshStandardMaterial({ color: color });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = "new";
        mesh.scale.set(0.01, 0.01, 0.5);
        mesh.position.z -= 1;
        var tempObject = new MetaObject(
          null,
          mesh.name,
          null,
          null,
          null,
          false,
          "Object"
        );
        tempObject.Init(mesh);
        // object_store.AddMetaObject(tempObject);
        tempObject.mesh.position.x = midx / 100 - _midx / 100;
        tempObject.mesh.position.y = -(midy / 100 - _midy / 100);
        tempObject.mesh.rotation.z = Math.PI;
        tempObject.mesh.rotation.y = Math.PI;
        var data = {
          mode: "add",
          objectId: tempObject.objectId,
          name: mesh.name,
          transform: tempObject.transform,
          group: tempObject.mesh,
          type: "Object",
        };
        // undo_store.AddUnDoCommand(tempObject, data, addUndo, addRedo);
      } else break;
    }
  }

  async function onItemMoveFinished(object) {
    object.AddMeshToRaycasterArray();
    common_store.setIsMoveMode(false);
    common_store.setIsMoveModeEnd(true);
    return;

    // let raycaster = new THREE.Raycaster();
    // switch (event.button) {
    //   case 0:
    //     if (common_store.isMoveMode && common_store.onPlane) {
    //       console.log("12hi");
    //       var target = objectViewModel.selectedObjects[0];
    //       var mouse = new THREE.Vector2();
    //       mouse.set(
    //         (event.clientX / window.innerWidth) * 2 - 1,
    //         -(event.clientY / (window.innerHeight + 78)) * 2 + 1
    //       );
    //       event.preventDefault();
    //       const tempTransform = new THREE.Object3D();
    //       const temp_scale = new THREE.Vector3(1, 1, 1);
    //       tempTransform.rotation.set(0, 0, 0);
    //       tempTransform.scale.copy(temp_scale);
    //       raycaster.setFromCamera(mouse, common_store.camera);

    //       const intersects = raycaster.intersectObjects(
    //         common_store.attachMode
    //           ? objectViewModel.raycastObjects
    //           : [common_store.plane],
    //         false
    //       );
    //       if (intersects.length > 0) {
    //         const intersect = intersects[0];
    //         if (intersect.object.name !== "plane") {
    //           if (common_store.normalMode) {
    //             let normalVector = intersect.face.normal.clone();
    //             normalVector.applyQuaternion(
    //               intersect.object.parent.parent.quaternion
    //             );
    //             let up = new THREE.Vector3(0, 1, 0);
    //             let axis = new THREE.Vector3();

    //             if (normalVector.y === 1 || normalVector.y === -1) {
    //               axis = new THREE.Vector3(1, 0, 0);
    //             } else {
    //               axis = up.cross(normalVector);
    //             }
    //             let radians = up.angleTo(normalVector);
    //             tempTransform.rotateOnWorldAxis(axis, radians);
    //           }
    //         }
    //         if (common_store.magneticMode) {
    //           tempTransform.position.set(
    //             Math.round(intersect.point.x * 2) / 2,
    //             Math.round(intersect.point.y * 2) / 2,
    //             Math.round(intersect.point.z * 2) / 2
    //           );
    //         } else {
    //           if (common_store.attachMode) {
    //             let subVec = BboxCenterToPointer(target, intersect.point);
    //             tempTransform.position.subVectors(
    //               target.group.position,
    //               subVec
    //             );
    //           } else {
    //             tempTransform.position.copy(intersect.point);
    //           }
    //         }
    //         if (tempTransform.position.y < 0.001) {
    //           tempTransform.position.y = 0;
    //         }
    //       }
    //       if (common_store.isMoveMode) {
    //         if (objectViewModel.isObjectSelected) {
    //           _currVector.copy(tempTransform.position);
    //           _currRotation.copy(tempTransform.rotation);
    //           objectViewModel.selectedObjects[0].group.position.copy(
    //             tempTransform.position
    //           );
    //           objectViewModel.selectedObjects[0].group.rotation.copy(
    //             tempTransform.rotation
    //           );
    //           objectViewModel.selectedObjects[0].AddMeshToRaycasterArray();
    //           var data = {
    //             mode: "move",
    //             name: objectViewModel.selectedObjects[0].name,
    //             objectId: objectViewModel.selectedObjects[0].objectId,
    //             currP: _currVector.clone(),
    //             currR: _currRotation.clone(),
    //             prevP: prevPosition.clone(),
    //             prevR: prevRotation.clone(),
    //           };
    //           console.log(Undo3D_VM().prevPosition);
    //           undo_store.AddUnDoCommand(
    //             objectViewModel.selectedObjects[0],
    //             data,
    //             moveUndo,
    //             moveRedo
    //           );
    //           common_store.setIsMoveMode(false);
    //           common_store.setIsMoveModeEnd(true);
    //         }
    //       }
    //     }
    //     break;
    //   case 1:
    //     break;
    //   case 2:
    //     break;
    //   default:
    //     break;
    // }
  }

  return {
    DropEventListener,
    ImportGLB,
    onItemMove,
    ImportImg,
    ImportApart,
    onMouseDown,
    onMouseUp,
  };
}
