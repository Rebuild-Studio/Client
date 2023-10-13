import Node from "../Node";

export class EqualNode extends Node {
  constructor(name, uuid, type = "Equal") {
    super(name, uuid, type);
  }
}
