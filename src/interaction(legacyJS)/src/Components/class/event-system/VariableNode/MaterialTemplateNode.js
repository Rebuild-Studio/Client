import Node from "../Node";

export class MaterialTemplateNode extends Node {
  constructor(name, uuid, type = "MaterialTemplate") {
    super(name, uuid, type);
  }
}
