import Node from "../Node";

export class ScaleSensorNode extends Node {
  constructor(name, uuid, objectId, type = "ScaleSensor") {
    super(name, uuid, type);
    this.category = "Sensor";
    this.setObject(objectId);
  }

  get object() {
    console.warn("ObjectNode.object is deprecated.");
    return this.control.object.value;
  }
}
