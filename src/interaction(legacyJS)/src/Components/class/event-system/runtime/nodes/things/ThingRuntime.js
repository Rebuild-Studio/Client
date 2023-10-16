import NodeRuntime from "../NodeRuntime";

function findMetaObject(object_store, uuid) {
  try {
    return object_store.metaObjects.find((metaObject) => {
      return metaObject.objectId === uuid;
    });
  } catch (e) {
    console.warn(e);
    return null;
  }
}

export default class ThingRuntime extends NodeRuntime {
  constructor(args) {
    super(args);
    switch (this.node.type) {
      case "MouseRaycast":
      case "PositionSensor":
      case "RotationSensor":
      case "ScaleSensor":
      case "ObjectSensor":
      case "Object":
        this.objectUuid = this.data.object;
        break;
      case "PointLightSensor":
      case "SpotLightSensor":
      case "PointLight":
      case "SpotLight":
        this.objectUuid = this.data.light;
        break;
      default:
        console.warn(`Thing Runtime: no target defined in ${this}`);
        break;
    }
    if (this.objectUuid) {
      this.metaObject = findMetaObject(
        this.node.special.object_store,
        this.objectUuid
      );
    }
    if (!this.metaObject) {
      if (this.objectUuid) {
        this.setError(`ThingRuntime : Object ${this.objectUuid} is missing.`);
      } else {
        this.setError(`ThingRuntime : ObjectUuid is not defined.`, false);
      }
    }
  }
}
