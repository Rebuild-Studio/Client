import { action, makeObservable, observable } from "mobx";
import UUIDGenerator from "../../../utils/uuid";
import Socket from "./Socket";
import { ControlType } from "./NodeControl";

/**
 * @description 인터랙션 노드 클래스
 * @class Node
 * @param {string} name 노드 이름
 * @param {string} uuid 노드 uuid(없으면 자동 생성)
 * @param {string} type 노드 타입(NodeData.js 참고)
 */
export default class Node {
  name;
  uuid;
  inputSockets = {};
  outputSockets = {};
  control = {};
  referenceParameter = {};
  type;
  category = "default";
  position = [0, 0];
  group = null;
  random = 0;
  uxSelector = "";
  data = {};

  constructor(name, uuid, type) {
    this.uuid = uuid ? uuid : UUIDGenerator.run();
    this.type = type ? type : "default";
    this.name = name ? name : this.type;

    makeObservable(this, {
      name: observable,
      uuid: observable,
      inputSockets: observable,
      outputSockets: observable,
      control: observable,
      referenceParameter: observable,
      type: observable,
      category: observable,
      position: observable,
      group: observable,
      random: observable,
      uxSelector: observable,
      addInputSocket: action,
      addOutputSocket: action,
      addData: action,
      assignValueByType: action,
      setObject: action,
      deleteInputSocket: action,
      deleteOutputSocket: action,
      deleteAllSockets: action,
      dispose: action,
      update: action,
      setUxSelector: action,
    });
  }

  setUxSelector(selector) {
    this.uxSelector = selector;
  }

  addInputSocket(key, type, reference, name = key) {
    if (this.inputSockets[key]) return null;
    const socket = new Socket(key, type, name, true, reference);
    socket.node = this.uuid;
    this.inputSockets[key] = socket;
    return socket;
  }

  addOutputSocket(key, type, reference, name = key) {
    if (this.outputSockets[key]) return null;
    const socket = new Socket(key, type, name, false, reference);
    socket.node = this.uuid;
    this.outputSockets[key] = socket;
    return socket;
  }

  addData() {
    // data should be filled with childNode class,
    // e.g ) RandomNode class will charge this.data itself
    const data = this.data;
    data.inputSocket.forEach((socket) => {
      this.addInputSocket(socket.name, socket.type, socket.reference);
    });
    data.outputSocket.forEach((socket) => {
      this.addOutputSocket(socket.name, socket.type, socket.reference);
    });
    if (data.control) {
      data.control.forEach((c) => {
        this.control[c.name] = {
          type: c.type,
          value: this.assignValueByType(c.value, c.type),
          label: c.label || false,
          IsDropdown: c.IsDropdown || false,
          IsUxSelector: c.IsUxSelector || false,
          extras: c.extras || false,
          tooltip: c.tooltip || false,
        };
      });
    }

    if (data.referenceParameter) {
      data.referenceParameter.forEach((c) => {
        this.referenceParameter[c.name] = {
          type: c.type,
          defaultValue: c.defaultValue || false,
          tooltipMessage: c.tooltipMessage || "",
          name: c.name || "",
        };
      });
    }
  }

  assignValueByType(value, type) {
    let ret;
    if (typeof value === "object") {
      switch (type) {
        case ControlType.Vector3:
        case ControlType.Color:
          ret = value.clone();
          break;
        case ControlType.Material:
          ret = Array.from(value);
          break;
        case ControlType.Animation:
          ret = Array.from(value);
          break;
        default:
          ret = {};
          Object.assign(ret, value);
          break;
      }
    } else {
      ret = value;
    }
    return ret;
  }

  setObject(objectId) {
    for (const name in this.control) {
      if (
        [
          ControlType.Object,
          ControlType.SpotLight,
          ControlType.PointLight,
        ].includes(this.control[name].type)
      ) {
        this.control[name].value = objectId;
        this.objectId = objectId;
      }
    }
  }

  deleteInputSocket(key) {
    delete this.inputSockets[key];
  }

  deleteOutputSocket(key) {
    delete this.outputSockets[key];
  }

  deleteAllSockets() {
    this.inputSockets = {};
    this.outputSockets = {};
  }

  setGroup(group) {
    this.group = group;
  }

  update() {
    this.random = Math.random();
  }

  dispose() {
    for (var is in this.inputSockets) {
      this.inputSockets[is].dispose();
    }
    for (var os in this.outputSockets) {
      this.outputSockets[os].dispose();
    }
  }

  clone() {
    return new this.constructor(this.name, "", this.type);
  }

  toJSON() {
    return {
      name: this.name,
      uuid: this.uuid,
      inputSockets: this.inputSockets,
      outputSockets: this.outputSockets,
      control: this.control,
      type: this.type,
      category: this.category,
      position: this.position,
      parentPosition: this.parentPosition,
      group: this.group,
    };
  }
}
