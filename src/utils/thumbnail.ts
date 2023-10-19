import storeContainer from "../store/storeContainer";
import * as THREE from "three";

// ToDo: 컴포넌트 목록 - 새 컴포넌트 만들기에 적절히 활용하기
const createThumbnail = () => {
  const { renderStore, projectStore } = storeContainer;
  const camera = renderStore.controls?.camera;

  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const canvas2 = canvas.children[0].children[0];

  const scene = projectStore.scene;

  if (!canvas) {
    throw new Error("Canvas element not found");
  }

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas2,
  });
  const screenshot = async () => {
    const screenCamera = new THREE.PerspectiveCamera();
    screenCamera.copy(camera as THREE.PerspectiveCamera);
    screenCamera.lookAt(0, 0, 0);

    renderer.render(scene as THREE.Scene, screenCamera);

    const blob = new Promise<string>((accept) => {
      renderer.domElement.toBlob((blob) => {
        if (blob) {
          const blobURL = URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = blobURL;
          link.download = "썸네일 테스트";
          link.click();

          const reader = new FileReader();
          reader.onload = () => {
            accept((reader.result as string)?.split(",")[1]);
          };
          reader.readAsDataURL(blob);
        } else {
          throw new Error("Blob is null");
        }
      }, "image/png");
    });

    return blob;
  };

  return { screenshot };
};

export { createThumbnail };
