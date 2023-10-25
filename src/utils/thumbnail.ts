import * as THREE from "three";
import { RenderStoreProps } from "@/store/renderStore";
import { ProjectStateProps } from "@/store/projectStateStore";
import { ProjectStore } from "@/store/projectStore";
import { PrimitiveStore } from "@/store/primitiveStore";

interface CreateThumbnailProps {
  renderStore: RenderStoreProps;
  projectStore: ProjectStore;
  projectStateStore: ProjectStateProps;
  primitiveStore: PrimitiveStore;
}

// ToDo: 컴포넌트 목록 - 새 컴포넌트 만들기에 적절히 활용하기
const createThumbnail = async (
  props: CreateThumbnailProps
): Promise<string> => {
  const { renderStore, projectStore, projectStateStore, primitiveStore } =
    props;
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) {
    throw new Error("Canvas element not found");
  }
  const camera = renderStore.controls?.camera;
  primitiveStore.clearSelectedPrimitives();
  primitiveStore.clearSelectedGroupPrimitive();
  const renderer = projectStore.renderer;
  projectStateStore.updateGridVisible("INVISIBLE");

  const scene = projectStore.scene;
  const screenCamera = new THREE.PerspectiveCamera();
  screenCamera.copy(camera as THREE.PerspectiveCamera);
  screenCamera.lookAt(0, 0, 0);

  return new Promise<string>((resolve) => {
    setTimeout(() => {
      renderer?.render(scene as THREE.Scene, screenCamera);
      renderer?.domElement.toBlob((blob) => {
        if (blob) {
          const reader = new FileReader();
          reader.onload = () => {
            resolve((reader.result as string)?.split(",")[1]);
          };
          reader.readAsDataURL(blob);
        } else {
          throw new Error("Blob is null");
        }
      }, "image/png");

      projectStateStore.updateGridVisible("VISIBLE");
    }, 0);
  });
};

export { createThumbnail };
