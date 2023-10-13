import Node from "../Node";

export class PositionSensorNode extends Node {
  constructor(name, uuid, objectId, type = "PositionSensor") {
    super(name, uuid, type);
    this.category = "Sensor";
    this.setObject(objectId);
  }

  get object() {
    console.warn("ObjectNode.object is deprecated.");
    return this.control.object.value;
  }
}
