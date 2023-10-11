import NodeRuntime from "../NodeRuntime";
import WarpOutProcess from "./WarpOutProcess";

export default class WarpOutRuntime extends NodeRuntime {
  constructor(args) {
    super(args);
    this.processes.push(new WarpOutProcess(this));
  }
}