import ConvertProcess from './ConvertProcess';
import NodeRuntime from '../../NodeRuntime';

export default class ConvertRuntime extends NodeRuntime {
  constructor(args) {
    super(args);
    this.processes.push(new ConvertProcess(this));
  }
}
