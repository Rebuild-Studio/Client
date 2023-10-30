import VariableProcess from './VariableProcess';
import NodeRuntime from '../NodeRuntime';

export default class VariableRuntime extends NodeRuntime {
  constructor(args) {
    super(args);
    this.processes.push(new VariableProcess(this));
  }
}
