import WarpOutProcess from './WarpOutProcess';
import NodeRuntime from '../NodeRuntime';

export default class WarpOutRuntime extends NodeRuntime {
  constructor(args) {
    super(args);
    this.processes.push(new WarpOutProcess(this));
  }
}
