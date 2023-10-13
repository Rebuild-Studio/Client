import Node from "../Node";

export class NotNode extends Node {
  constructor(name, uuid, type = "Not") {
    super(name, uuid, type);
  }
}
