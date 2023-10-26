import WarpInProcess from './WarpInProcess';
import NodeRuntime from '../NodeRuntime';

export default class WarpInRuntime extends NodeRuntime {
  constructor(args) {
    super(args);
    this.processes.push(new WarpInProcess(this));
  }
}
