import Node from "../Node";

export class OrNode extends Node {
  constructor(name, uuid, type = "Or") {
    super(name, uuid, type);
  }
}
