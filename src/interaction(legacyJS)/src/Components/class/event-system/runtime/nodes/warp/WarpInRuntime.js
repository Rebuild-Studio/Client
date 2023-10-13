import NodeRuntime from "../NodeRuntime";
import WarpInProcess from "./WarpInProcess";

export default class WarpInRuntime extends NodeRuntime {
  constructor(args) {
    super(args);
    this.processes.push(new WarpInProcess(this));
  }
}