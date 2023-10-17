/* eslint-disable array-callback-return */
import storeContainer from "../stores/storeContainer";
import { useState } from "react";
import { MathUtils } from "three";
import * as THREE from "three";
import { objectViewModel } from "./Object_VM";
import canvasHistory_store from "../stores/CanvasHistory_Store";
import SetTransformCommand from "../class/commands/CanvasObject/SetTransformCommand";
export default function ConvertVM() {
  const { object_store } = storeContainer;

  const convertEuler = (euler, toDegrees) => {
    const _euler = new THREE.Euler().copy(euler);
    if (toDegrees) {
      _euler._x *= THREE.MathUtils.RAD2DEG;
      _euler._y *= THREE.MathUtils.RAD2DEG;
      _euler._z *= THREE.MathUtils.RAD2DEG;
    } else {
      _euler._x *= THREE.MathUtils.DEG2RAD;
      _euler._y *= THREE.MathUtils.DEG2RAD;
      _euler._z *= THREE.MathUtils.DEG2RAD;
    }

    return _euler;
  };
  const [position, setPosition] = useState(
    object_store.selectedObjects[0].props["position"]
  );

  const [rotation, setRotation] = useState(
    convertEuler(object_store.selectedObjects[0].props["rotation"], true)
  );
  const [scale, setScale] = useState(
    object_store.selectedObjects[0].props["scale"]
  );
  const InitTransFormation = () => {
    setPosition(object_store.selectedObjects[0].props["position"]);
    setRotation(
      convertEuler(object_store.selectedObjects[0].props["rotation"], true)
    );
    setScale(object_store.selectedObjects[0].props["scale"]);
  };
  const handleOnClick = (e) => {
    var id = e.target.id;

    const prop = id.substr(0, id.length - 1);
    const axis = id.substr(-1).toLowerCase();
    let curValue = {};
    let newValue = {};
    let data = null;

    if (prop === "position") {
      curValue = { ...position };
      newValue = {
        ...position,
        [axis]: e.target.value,
      };

      setPosition(newValue);
      const oldPosition = new THREE.Vector3();
      const newPosition = new THREE.Vector3();

      if (object_store.selectedObjects[0].type === "Audio") {
        oldPosition.copy(object_store.selectedObjects[0].props.position);
      } else {
        oldPosition.copy(object_store.selectedObjects[0].mesh.position);
      }

      newPosition.set(newValue.x, newValue.y, newValue.z);
      data = {
        type: prop,
        oldValue: oldPosition.clone(),
        newValue: newPosition.clone(),
      };
    } else if (prop === "rotation") {
      curValue = { ...rotation };
      const _euler = new THREE.Euler().copy(rotation);
      _euler[axis] = e.target.value;
      newValue = { ..._euler };
      const _newValue = {
        ...newValue,
      };

      newValue = convertEuler(_euler, false);
      newValue = {
        ...newValue,
        _x: parseFloat(newValue._x),
        _y: parseFloat(newValue._y),
        _z: parseFloat(newValue._z),
      };
      setRotation(_newValue);
      const oldRotation = new THREE.Euler();
      const newRotation = new THREE.Euler();
      if (object_store.selectedObjects[0].type === "Audio") {
        oldRotation.copy(object_store.selectedObjects[0].props.rotation);
      } else {
        oldRotation.copy(object_store.selectedObjects[0].mesh.rotation);
      }

      newRotation.set(newValue._x, newValue._y, newValue._z);
      data = {
        type: prop,
        oldValue: oldRotation.clone(),
        newValue: newRotation.clone(),
      };
    } else if (prop === "scale") {
      curValue = { ...scale };
      newValue = {
        ...scale,
        [axis]: e.target.value,
      };
      setScale(newValue);
      const oldScale = new THREE.Vector3();
      const newScale = new THREE.Vector3();
      if (object_store.selectedObjects[0].type === "Audio") {
        oldScale.copy(object_store.selectedObjects[0].props.scale);
      } else {
        oldScale.copy(object_store.selectedObjects[0].mesh.scale);
      }

      newScale.set(newValue.x, newValue.y, newValue.z);
      data = {
        type: prop,
        oldValue: oldScale.clone(),
        newValue: newScale.clone(),
      };
    }
    canvasHistory_store.execute(
      new SetTransformCommand(object_store.selectedObjects[0], data)
    );
  };
  const handleonChange = (e) => {
    const id = e.target.id;

    const prop = id.substr(0, id.length - 1);
    const axis = id.substr(-1).toLowerCase();

    let newValue = {};

    if (prop === "position") {
      newValue = {
        ...position,
        [axis]: e.target.value,
      };

      setPosition(newValue);
    } else if (prop === "rotation") {
      const _euler = new THREE.Euler().copy(rotation);

      _euler[axis] = e.target.value;
      newValue = _euler;

      setRotation(newValue);
    } else if (prop === "scale") {
      newValue = {
        ...scale,
        [axis]: e.target.value,
      };
      setScale(newValue);
    }
  };
  function ApplyConvertValue(prop, axis, value) {
    let data = null;
    if (objectViewModel.isObjectSelected) {
      if (prop === "scale") {
        if (
          object_store.selectedObjects[0]["mesh"][prop][axis] === Number(value)
        )
          return;
        const oldScale = new THREE.Vector3();
        const newScale = new THREE.Vector3();
        oldScale.copy(object_store.selectedObjects[0].mesh.scale);
        newScale.set(scale.x, scale.y, scale.z);
        data = {
          type: prop,
          oldValue: oldScale.clone(),
          newValue: newScale.clone(),
        };
      }
      if (prop === "position") {
        if (
          object_store.selectedObjects[0]["mesh"][prop][axis] === Number(value)
        )
          return;
        const oldPosition = new THREE.Vector3();
        const newPosition = new THREE.Vector3();
        oldPosition.copy(object_store.selectedObjects[0].mesh.position);
        newPosition.set(position.x, position.y, position.z);
        data = {
          type: prop,
          oldValue: oldPosition.clone(),
          newValue: newPosition.clone(),
        };
      }
      if (prop === "rotation") {
        if (
          object_store.selectedObjects[0]["mesh"][prop][axis] ===
          MathUtils.degToRad(value)
        )
          return;
        const oldRotation = new THREE.Euler();
        const newRotation = new THREE.Euler();
        const _rotation = convertEuler(rotation, false);
        oldRotation.copy(object_store.selectedObjects[0].mesh.rotation);
        newRotation.set(_rotation.x, _rotation.y, _rotation.z);
        data = {
          type: prop,
          oldValue: oldRotation.clone(),
          newValue: newRotation.clone(),
        };
      }
      // objectViewModel.SetProps(prop, newValue);
      canvasHistory_store.execute(
        new SetTransformCommand(object_store.selectedObjects[0], data)
      );
    }
  }

  const handleonKeyDown = (e) => {
    var id = e.target.id;

    const type = id.substr(0, id.length - 1);
    const axis = id.substr(-1).toLowerCase();

    if (e.keyCode === 13 || e.keyCode === 9) {
      if (e.target.value !== "" && e.target.value !== "-") {
        const num = e.target.value;

        ApplyConvertValue(type, axis, num);
      } else {
        InitTransFormation();
      }
    }
  };
  const handleonBlur = (e) => {
    var id = e.target.id;

    const type = id.substr(0, id.length - 1);
    const axis = id.substr(-1).toLowerCase();

    if (e.target.value !== "" && e.target.value !== "-") {
      const num = e.target.value;

      ApplyConvertValue(type, axis, num);
    } else {
      InitTransFormation();
    }
  };

  return {
    handleonKeyDown,
    handleOnClick,
    handleonBlur,
    position,
    rotation,
    scale,
    handleonChange,
    InitTransFormation,
  };
}
