import NodeRuntime from "../NodeRuntime";
import CameraProcess from "./CameraProcess";
import CameraUpdateProcess from "./CameraUpdateProcess";

export default class CameraRuntime extends NodeRuntime {
  constructor(args) {
    super(args);
    this.camera = this.node.special.three.camera;
    if (!this.camera.isPerspectiveCamera) {
      this.setError(`CameraRuntime : Camera is not PerspectiveCamera`);
    }
    this.isCameraParameterChanged = false;
    this.inputKeys.forEach((key) => {
      this.processes.push(new CameraProcess(this, key));
    });
    this.processes.push(new CameraUpdateProcess(this));
  }
}
