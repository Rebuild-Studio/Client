import * as THREE from 'three';
import { CameraControls } from '@react-three/drei';

type Coords = { x: number; y: number; z: number };

type BoundingBox = {
  min: Coords;
  max: Coords;
};

class FocusController {
  groupBoundingBox: BoundingBox = {
    min: {
      x: Infinity,
      y: Infinity,
      z: Infinity
    },
    max: {
      x: -Infinity,
      y: -Infinity,
      z: -Infinity
    }
  };
  objects: THREE.Mesh[];
  controls: CameraControls;
  fov: number;
  offsetAngleInDeg: number;

  constructor(
    objects: THREE.Mesh[],
    controls: CameraControls,
    options: { fov: number; offsetAngleInDeg: number } = {
      fov: 50,
      offsetAngleInDeg: 10
    }
  ) {
    this.objects = objects;
    this.controls = controls;
    this.fov = options.fov;
    this.offsetAngleInDeg = options.offsetAngleInDeg;
    this.calculateGroupBoundingBox();
  }

  calculateGroupBoundingBox() {
    this.objects.forEach((object) => {
      const boundingBox = new THREE.Box3().setFromObject(object);

      this.groupBoundingBox.max.x = Math.max(
        this.groupBoundingBox.max.x,
        boundingBox.max.x
      );
      this.groupBoundingBox.max.y = Math.max(
        this.groupBoundingBox.max.y,
        boundingBox.max.y
      );
      this.groupBoundingBox.max.z = Math.max(
        this.groupBoundingBox.max.z,
        boundingBox.max.z
      );

      this.groupBoundingBox.min.x = Math.min(
        this.groupBoundingBox.min.x,
        boundingBox.min.x
      );
      this.groupBoundingBox.min.y = Math.min(
        this.groupBoundingBox.min.y,
        boundingBox.min.y
      );
      this.groupBoundingBox.min.z = Math.min(
        this.groupBoundingBox.min.z,
        boundingBox.min.z
      );
    });
  }

  calculateCameraPosition(): [number, number, number] {
    // https://github.com/Rebuild-Studio/Client/pull/172
    const canvas = document.getElementById('canvas')!;

    const objectHeight =
      this.groupBoundingBox.max.y - this.groupBoundingBox.min.y;
    const objectWidth =
      this.groupBoundingBox.max.x - this.groupBoundingBox.min.x;

    const verticalFov = THREE.MathUtils.degToRad(this.fov);
    const horizontalFov =
      2 *
      Math.atan(
        (Math.tan(verticalFov / 2) * canvas.clientWidth) / canvas.clientHeight
      );

    const OFFSET_ANGLE = THREE.MathUtils.degToRad(this.offsetAngleInDeg);
    const OFFSET_Y = 0.5;
    const OFFSET_Z = Math.max(
      objectHeight / 2 / Math.tan((verticalFov - OFFSET_ANGLE) / 2),
      objectWidth / 2 / Math.tan((horizontalFov - OFFSET_ANGLE) / 2)
    );

    const [centerX, centerY, _] = this.calculateGroupCenter();

    const newCameraX = centerX;
    const newCameraY = centerY + OFFSET_Y;
    const newCameraZ = this.groupBoundingBox.max.z + OFFSET_Z;
    return [newCameraX, newCameraY, newCameraZ];
  }

  calculateGroupCenter(): [number, number, number] {
    const centerX =
      (this.groupBoundingBox.max.x + this.groupBoundingBox.min.x) / 2;
    const centerY =
      (this.groupBoundingBox.max.y + this.groupBoundingBox.min.y) / 2;
    const centerZ =
      (this.groupBoundingBox.max.z + this.groupBoundingBox.min.z) / 2;
    return [centerX, centerY, centerZ];
  }

  focus() {
    const newCameraPosition = this.calculateCameraPosition();
    const newCameraTarget = this.calculateGroupCenter();
    void this.controls.setLookAt(...newCameraPosition, ...newCameraTarget);
  }

  focusScene() {
    void this.controls.setLookAt(0, 25, 50, 0, 0, 0);
  }
}

export default FocusController;
