import { CameraControls } from "@react-three/drei";
import { observable } from "mobx";

interface renderStore {
  controls: CameraControls | null;
  setControls: (prop: CameraControls) => void;
}

const renderStore = observable<renderStore>({
  controls: null,

  setControls(state) {
    this.controls = state;
  },
});

export default renderStore;
