interface Geometry {
  data: string;
  uuid: string;
}

interface Image {
  url: string;
  uuid: string;
}

interface SceneJsonObject {
  name: string;
  type: string;
  children: SceneJsonObject[];
  matrix?: number[];
  visible?: boolean;
}

interface SceneJson {
  images: Image[];
  geometries: Geometry[];
  object: SceneJsonObject;
}

export type {
  SceneJson,
  Geometry as SceneJsonGeometry,
  Image as SceneJsonImage,
  SceneJsonObject
};
