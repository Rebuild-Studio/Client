import NodeRuntime from "../NodeRuntime";
import VariableProcess from "./VariableProcess";

export default class VariableRuntime extends NodeRuntime {
  constructor(args) {
    super(args);
    this.processes.push(new VariableProcess(this));
  }
}