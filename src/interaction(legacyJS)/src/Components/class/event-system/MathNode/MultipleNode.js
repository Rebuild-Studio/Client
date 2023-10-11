import Node from "../Node";

export class MultipleNode extends Node {
  constructor(name, uuid, type = "Multiple") {
    super(name, uuid, type);
  }
}
