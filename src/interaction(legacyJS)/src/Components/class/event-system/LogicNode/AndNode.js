import Node from "../Node";

export class AndNode extends Node {
  constructor(name, uuid, type = "And") {
    super(name, uuid, type);
  }
}
