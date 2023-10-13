import { makeObservable, action, observable } from "mobx";
import UUIDGenerator from "../../../utils/uuid";

export default class NodeGroup {
  name;
  uuid;
  children = [];
  position = [0, 0];
  size = [100, 100];
  folder = "open";
  type = "group";

  constructor(name, uuid) {
    this.uuid = uuid ? uuid : UUIDGenerator.run();
    this.name = name ? name : this.type;
    makeObservable(this, {
      name: observable,
      uuid: observable,
      children: observable,
      position: observable,
      size: observable,
      folder: observable,
      addChildren: action,
      deleteChild: action,
      setPosition: action,
      setSize: action,
    });
  }

  addChildren(children) {
    this.children = [...this.children, ...children];
  }

  deleteChild(uuid) {
    this.children = this.children.filter((child) => child !== uuid);
  }

  setPosition(position) {
    this.position = position;
  }

  setSize(size) {
    this.size = size;
  }

  toJSON() {
    return {
      uuid: this.uuid,
      name: this.name,
      children: this.children,
      position: this.position,
      size: this.size,
    };
  }

  dispose() {
    this.children.forEach((child) => this.deleteChild(child.uuid));
  }
}
