import {
  NodeControl,
  ControlType,
} from "../../../../class/event-system/NodeControl";
import { generateKeyFormat } from "../../../../class/event-system/runtime/utils";
import storeContainer from "../../../../stores/storeContainer";

export default function ControlDataVM() {
  function getObjectList(metaObjects, dataType) {
    switch (dataType) {
      case ControlType.Object:
        return metaObjects.filter(
          (object) => !object.props["lightType"] && !object.camera
        );
      case ControlType.PointLight:
        return metaObjects.filter(
          (object) => object.props && object.props["lightType"] === "PointLight"
        );
      case ControlType.SpotLight:
        return metaObjects.filter(
          (object) => object.props && object.props["lightType"] === "SpotLight"
        );
      case ControlType.Sensor:
        return metaObjects;
      case ControlType.Camera:
        return metaObjects.filter((object) => object.camera);
      default:
        console.warn("Control Type is undefined in Object Category");
        return;
    }
  }

  function getFunctionList() {
    const { eventSystem_store } = storeContainer;
    const functionSheetList = [];
    for (const key in eventSystem_store.sheets) {
      if (eventSystem_store.sheets[key].type === "function")
        console.log(key, eventSystem_store.sheets[key]);
      functionSheetList.push(eventSystem_store.sheets[key]);
    }
    return functionSheetList;
  }

  function GetDropdownData(node, data, metaObjects) {
    switch (data.type) {
      case "Sensor":
      case "Object":
      case "PointLight":
      case "SpotLight": {
        const objectList = getObjectList(metaObjects, data.type);
        const objectMap = new Map(
          objectList.map((object) => [object.objectId, object.name])
        );
        const objectData = { list: objectList, map: objectMap };
        return objectData;
      }
      case "Function": {
        const functionList = getFunctionList();
        const functionMap = new Map(
          functionList.map((sheet) => [sheet.uuid, sheet.name])
        );
        const functionData = { list: functionList, map: functionMap };
        return functionData;
      }
      case "Asset": {
        const functionList = getFunctionList();
        const functionMap = new Map(
          functionList.map((sheet) => [sheet.uuid, sheet.name])
        );
        const functionData = { list: functionList, map: functionMap };
        return functionData;
      }
      default:
        return {
          list: NodeControl[data.type] && NodeControl[data.type].options,
        };
    }
  }

  function GetAnimationData(node, metaObjects) {
    const objectId = node.control.object.value;
    const object = metaObjects.find((object) => object.objectId === objectId);
    if (object) {
      const animationList = object.animationList.map((obj) => {
        return {
          name: obj.name,
          key: generateKeyFormat(obj.name, ControlType.Animation),
        };
      });
      return animationList;
    } else {
      return [];
    }
  }

  function GetMaterialData(node, metaObjects) {
    const objectId = node.control.object.value;
    if (objectId) {
      const object = metaObjects.find((object) => object.objectId === objectId);
      const materialList = Object.keys(object.materialProps).map((uuid) => {
        return {
          name: object.materialProps[uuid].name,
          key: generateKeyFormat(uuid, ControlType.Material),
        };
      });
      return materialList;
    } else {
      return [];
    }
  }
  function DetectConvertFromTo(value) {
    switch (value) {
      case "BooleanToNumber":
        return { from: ControlType.Boolean, to: ControlType.Number };
      case "ColorToNumber":
        return { from: ControlType.Color, to: ControlType.Number };
      case "NumberToBoolean":
        return { from: ControlType.Number, to: ControlType.Boolean };
      case "NumberToVector3":
        return { from: ControlType.Number, to: ControlType.Vector3 };
      case "NumberToColor":
        return { from: ControlType.Number, to: ControlType.Color };
      case "Vector3ToNumber":
        return { from: ControlType.Vector3, to: ControlType.Number };
      default:
        return { from: "", to: "" };
    }
  }
  function DetectTypeFromConvert(from, to) {
    switch (from) {
      case ControlType.Boolean:
        if (to === ControlType.Number) {
          return "BooleanToNumber";
        }
        break;
      case ControlType.Color:
        if (to === ControlType.Number) {
          return "ColorToNumber";
        }
        break;
      case ControlType.Number:
        if (to === ControlType.Boolean) {
          return "NumberToBoolean";
        }
        if (to === ControlType.Color) {
          return "NumberToColor";
        }
        if (to === ControlType.Vector3) {
          return "NumberToVector3";
        }
        break;
      case ControlType.Vector3:
        if (to === ControlType.Number) {
          return "Vector3ToNumber";
        }
        break;
      default:
        return "None";
    }
  }

  return {
    GetDropdownData,
    GetMaterialData,
    GetAnimationData,
    DetectConvertFromTo,
    DetectTypeFromConvert,
  };
}
