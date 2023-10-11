import UUIDGenerator from "../../../utils/uuid.js";
import { action, makeObservable, observable } from "mobx";
import Wire from "./Wire";

export default class Socket {
  key;
  uuid;
  type;
  name;
  wires = [];
  node = null;
  isInput = false;
  reference = null;

  constructor(key, type, name, isInput, reference) {
    this.key = key;
    this.uuid = UUIDGenerator.run();
    this.type = type;
    this.name = name ? name : key;
    this.isInput = isInput;
    this.reference = reference ? reference : null;
    makeObservable(this, {
      key: observable,
      uuid: observable,
      type: observable,
      name: observable,
      wires: observable,
      node: observable,
      isInput: observable,
      reference: observable,
      setWire: action,
      removeWire: action,
      removeWireByUuid: action,
      dispose: action,
    });
  }

  /**
   * @description
   * this는 output socket을 가리킴
   * @param {Socket} target - Input을 받는 소켓(우측 소켓)
   * @returns
   */
  setWire(target) {
    // 노드아이디가 없으면 종료 ( target.node는 node 정보가 아닌 id 값임)
    if (!this.node) return;

    const wire = new Wire(this.type);

    if (this.isInput) {
      wire.setHeadSocket(this);
      wire.setTailSocket(target);
    } else {
      wire.setHeadSocket(target);
      wire.setTailSocket(this);
    }
    this.wires = [...this.wires, wire];
    target.wires = [...target.wires, wire];
    return wire;
  }

  removeWire(wire) {
    this.wires = this.wires.filter((e) => e !== wire);
  }

  removeWireByUuid(uuid) {
    this.wires = this.wires.filter((e) => e.uuid !== uuid);
  }

  toJSON() {
    return {
      key: this.key,
      uuid: this.uuid,
      type: this.type,
      name: this.name,
      wires: this.wires,
      node: this.node,
      isInput: this.isInput,
    };
  }

  dispose() {
    this.wires.forEach((w) => w.dispose());
    this.wires = [];
    this.node = null;
  }
}
