import CameraSensorProcess from './CameraSensorProcess';
import NodeRuntime from '../NodeRuntime';

export default class CameraSensorRuntime extends NodeRuntime {
  constructor(args) {
    super(args);
    this.camera = this.node.special.three.camera;
    if (!this.camera.isPerspectiveCamera) {
      this.setError(`CameraSensorRuntime : Camera is not PerspectiveCamera`);
    }
    this.outputKeys.forEach((key) => {
      this.processes.push(new CameraSensorProcess(this, key));
    });
  }
}
