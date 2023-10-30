import RandomProcess from './RandomProcess';
import NodeRuntime from '../NodeRuntime';

export default class RandomRuntime extends NodeRuntime {
  constructor(args) {
    super(args);
    this.processes.push(new RandomProcess(this));
  }
}
