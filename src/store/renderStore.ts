import { CameraControls } from "@react-three/drei";
import { makeAutoObservable } from "mobx";

class RenderStore {
  controls: CameraControls | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setControls(state: CameraControls) {
    this.controls = state;
  }
}

const renderStore = new RenderStore();

export default renderStore;
