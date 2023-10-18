import { CameraControls } from "@react-three/drei";
import { observable } from "mobx";

interface RenderStoreProps {
  controls: CameraControls | null;
  setControls: (prop: CameraControls) => void;
}

const renderStore = observable<RenderStoreProps>({
  controls: null,

  setControls(state) {
    this.controls = state;
  },
});

export type {RenderStoreProps}
export default renderStore;
