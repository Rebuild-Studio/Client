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
const createThumbnail = async (props: CreateThumbnailProps) => {
  const { renderStore, projectStore, projectStateStore, primitiveStore } =
    props;
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) {
    throw new Error("Canvas element not found");
  }
  const camera = renderStore.controls?.camera;
  const canvas2 = canvas.children[0].children[0];
  let meshId: string;
  if (Object.keys(primitiveStore.selectedPrimitives).length === 0) {
    meshId = Object.keys(primitiveStore.primitives)[0];
  }
  primitiveStore.clearSelectedPrimitives();
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas2,
  });
  projectStateStore.updateGridVisible("INVISIBLE");

  const scene = projectStore.scene;
  const screenCamera = new THREE.PerspectiveCamera();
  screenCamera.copy(camera as THREE.PerspectiveCamera);
  screenCamera.lookAt(0, 0, 0);

  const invisible = new Promise<void>((resolve) => {
    setTimeout(() => {
      renderer.render(scene as THREE.Scene, camera as THREE.Camera);
      resolve();
    }, 0);
  });

  invisible.then(() => {
    const blob = renderer.domElement.toBlob((blob) => {
      if (blob) {
        const blobURL = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobURL;
        link.download = "썸네일 테스트";
        link.click();
        const reader = new FileReader();
        reader.onload = () => {
          (reader.result as string)?.split(",")[1];
        };
        reader.readAsDataURL(blob);
        primitiveStore.addSelectedPrimitives(
          meshId,
          primitiveStore.meshes[meshId]
        );
        projectStateStore.updateGridVisible("VISIBLE");
        meshId &&
          primitiveStore.addSelectedPrimitives(
            meshId,
            primitiveStore.meshes[meshId]
          );
      } else {
        throw new Error("Blob is null");
      }
    }, "image/png");

    return blob;
  });
};

export { createThumbnail };
