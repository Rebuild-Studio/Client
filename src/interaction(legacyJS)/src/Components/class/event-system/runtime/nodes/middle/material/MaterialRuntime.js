import NodeRuntime from "../../NodeRuntime";
import MaterialProcess from "./MaterialProcess";

export default class MaterialRuntime extends NodeRuntime {
  constructor(args) {
    super(args);
    this.processes.push(new MaterialProcess(this));
  }
}
