import UUIDGenerator from "../../../utils/uuid";
import { action, makeObservable, observable } from "mobx";

export default class Wire {
  uuid;
  headSocket = "";
  tailSocket = "";
  type;
  constructor(type, uuid = undefined) {
    this.type = type;
    this.uuid = uuid ? uuid : UUIDGenerator.run();
    makeObservable(this, {
      uuid: observable,
      headSocket: observable,
      tailSocket: observable,
      type: observable,
      setHeadSocket: action,
      setTailSocket: action,
      dispose: action,
    });
  }

  setHeadSocket(socket) {
    this.headSocket = socket.uuid;
  }

  setTailSocket(socket) {
    this.tailSocket = socket.uuid;
  }

  toJSON() {
    return {
      uuid: this.uuid,
      headSocket: this.headSocket,
      tailSocket: this.tailSocket,
      type: this.type?.name,
    };
  }

  dispose() {}
}
