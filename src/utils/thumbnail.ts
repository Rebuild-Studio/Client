import * as THREE from 'three';
import { PrimitiveStore } from '@store/primitive.store.ts';
import { ProjectStore } from '@store/project.store.ts';
import { RenderStore } from '@store/render.store.ts';
import { SceneSettingStore } from '@store/sceneSetting.store.ts';

interface CreateThumbnailProps {
  renderStore: RenderStore;
  projectStore: ProjectStore;
  sceneSettingStore: SceneSettingStore;
  primitiveStore: PrimitiveStore;
}

type createThumbnailType = 'STRING' | 'ARRAY_BUFFER';

// ToDo: 컴포넌트 목록 - 새 컴포넌트 만들기에 적절히 활용하기
const createThumbnail = async (
  props: CreateThumbnailProps,
  _type: createThumbnailType = 'STRING' //임시로 STRING으로 고정(SAS에서 arraybuffer 형식이 필요함)
): Promise<string> => {
  const { renderStore, projectStore, sceneSettingStore, primitiveStore } =
    props;
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  if (!canvas) {
    throw new Error('Canvas element not found');
  }
  const camera = renderStore.controls?.camera;
  primitiveStore.clearSelectedPrimitives();
  primitiveStore.clearSelectedGroupPrimitive();
  const renderer = projectStore.renderer;
  // grid 안보이게
  sceneSettingStore.setIsGridVisible(false);
  sceneSettingStore.setIsAxisVisible(false);

  //씬 가져오고,
  const scene = projectStore.scene;
  //사진 찍을 카메라 위치 세팅
  const screenCamera = new THREE.PerspectiveCamera();
  screenCamera.copy(camera as THREE.PerspectiveCamera);
  screenCamera.lookAt(0, 0, 0.1);

  return new Promise<string>((resolve) => {
    setTimeout(() => {
      renderer?.render(scene as THREE.Scene, screenCamera);
      //캔버스 blob으로 변환
      renderer?.domElement.toBlob((blob) => {
        if (blob) {
          // 캔버스 다운사이징 해서 다시 그리고 blob으로 변환
          // TODO : 순수함수로 바꾸기
          const img = new Image();
          img.onload = () => {
            const downsizedCanvas = document.createElement('canvas');
            downsizedCanvas.width = 1920 / 5;
            downsizedCanvas.height = 1080 / 5;
            const ctx = downsizedCanvas.getContext('2d');

            ctx?.drawImage(
              img,
              0,
              0,
              downsizedCanvas.width,
              downsizedCanvas.height
            );

            // Convert the downsized image back to a blob
            downsizedCanvas.toBlob((downsizedBlob) => {
              const reader = new FileReader();
              reader.onload = () => {
                resolve((reader.result as string)?.split(',')[1]);
              };
              reader.readAsDataURL(downsizedBlob as Blob);
            }, 'image/png');
          };
          img.src = URL.createObjectURL(blob);
        } else {
          throw new Error('Blob is null');
        }
      }, 'image/png');

      // grid 보이게
      sceneSettingStore.setIsGridVisible(true);
      sceneSettingStore.setIsAxisVisible(true);
    }, 0);
  });
};

export { createThumbnail };
