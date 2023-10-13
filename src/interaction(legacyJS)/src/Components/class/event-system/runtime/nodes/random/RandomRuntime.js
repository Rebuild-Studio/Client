import NodeRuntime from "../NodeRuntime";
import RandomProcess from "./RandomProcess";

export default class RandomRuntime extends NodeRuntime {
  constructor(args) {
    super(args);
    this.processes.push(new RandomProcess(this));
  }
}