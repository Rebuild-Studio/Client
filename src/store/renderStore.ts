import { observable } from "mobx";
import * as THREE from "three";

interface renderStore {
  camera: THREE.Camera | null;
  setCamera: (prop: THREE.Camera) => void;
}

const renderStore = observable<renderStore>({
  camera: null,
  setCamera(camera) {
    this.camera = camera;
  },
});

export default renderStore;
