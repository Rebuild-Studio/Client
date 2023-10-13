import NodeProcess from "../NodeProcess";

export default class CameraUpdateProcess extends NodeProcess {
  updateCameraProjectionMatrix() {
    if (this.nodeRuntime.isCameraParameterChanged) {
      this.nodeRuntime.camera.updateProjectionMatrix();
    }
  }
  coreWork(state, delta, xrFrame) {
    this.updateCameraProjectionMatrix();
  }
  end() {
    this.updateCameraProjectionMatrix();
  }
}
