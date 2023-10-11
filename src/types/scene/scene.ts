interface Geometry {
  data: string;
  uuid: string;
}

interface Image {
  url: string;
  uuid: string;
}

interface SceneJson {
  images: Image[];
  geometries: Geometry[];
}

export type { SceneJson };
