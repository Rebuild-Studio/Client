import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

export class FileLoader {
  private static _instance: FileLoader;

  public gltfLoader: GLTFLoader;
  public objLoader: OBJLoader;

  private constructor() {
    this.gltfLoader = new GLTFLoader();
    this.objLoader = new OBJLoader();
  }

  public static get instance(): FileLoader {
    if (!this._instance) {
      this._instance = new FileLoader();
    }

    return this._instance;
  }
}
