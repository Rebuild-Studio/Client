import NodeRuntime from "../../NodeRuntime";
import ConvertProcess from "./ConvertProcess";

export default class ConvertRuntime extends NodeRuntime {
  constructor(args) {
    super(args);
    this.processes.push(new ConvertProcess(this));
  }
}
