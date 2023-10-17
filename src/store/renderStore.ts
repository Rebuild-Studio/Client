import { observable } from "mobx";
import { CameraControls } from "@react-three/drei";

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
