import MaterialProcess from './MaterialProcess';
import NodeRuntime from '../../NodeRuntime';

export default class MaterialRuntime extends NodeRuntime {
  constructor(args) {
    super(args);
    this.processes.push(new MaterialProcess(this));
  }
}
