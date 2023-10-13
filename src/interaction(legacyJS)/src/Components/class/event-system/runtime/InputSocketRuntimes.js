import { Vector3, Color } from "three";

function socketDefaultValue(type) {
  let defaultValue;
  switch (type) {
    case "Boolean":
      defaultValue = false;
      break;
    case "Color":
      defaultValue = new Color();
      break;
    case "Material":
      defaultValue = {
        Template: undefined,
        color: undefined,
        metalness: undefined,
        roughness: undefined,
        ior: undefined,
        opacity: undefined,
      };
      break;
    case "Number":
      defaultValue = 0;
      break;
    case "Vector3":
      defaultValue = new Vector3();
      break;
    default:
      console.warn(`getDefaultValue: Unknown data type: ${type}`);
      break;
  }
  return defaultValue;
}
export default class InputSocketRuntimes {
  constructor(sockets) {
    this.sockets = {};
    for (const [key, value] of Object.entries(sockets)) {
      const defaultValue = socketDefaultValue(value.type);
      this.sockets[key] = {
        uuid: value.uuid,
        type: value.type,
        defaultValue: value.reference
          ? value.reference.defaultValue
          : defaultValue,
        tails: [],
        foundTails: [], // array of {outputSockets, name}
      };
      value.wires.forEach((wire) => {
        this.sockets[key].tails.push(wire.tailSocket);
      });
    }
  }
  readValue(name) {
    //for wire update
    this.sockets[name].previous = this.sockets[name].value;
    //TODO assemble values
    this.sockets[name].foundTails.forEach((tail, index) => {
      try {
        this.sockets[name].value = tail.sockets.giveValue(tail.name);
      } catch (e) {
        if (e.message === "disabled") {
          this.sockets[name].tails.splice(index, 1);
          this.sockets[name].foundTails.splice(index, 1);
        } else {
          throw e;
        }
      }
    });
    if (typeof this.sockets[name].value === "undefined") {
      this.sockets[name].value = this.sockets[name].defaultValue;
    }
    return {
      changed: this.sockets[name].value !== this.sockets[name].previous,
      value: this.sockets[name].value,
    };
  }
  setDefaultValue(name, value) {
    this.sockets[name].defaultValue = value;
  }
  isConnected(name) {
    return this.socket[name].tails.length > 0;
  }
}
