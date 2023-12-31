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

  const scene = projectStore.scene;
  const screenCamera = new THREE.PerspectiveCamera();
  screenCamera.copy(camera as THREE.PerspectiveCamera);
  screenCamera.lookAt(0, 0, 0);

  return new Promise<string>((resolve) => {
    setTimeout(() => {
      renderer?.render(scene as THREE.Scene, screenCamera);
      renderer?.domElement.toBlob((blob) => {
        if (blob) {
          // if (type === 'ARRAY_BUFFER') resolve(blob.arrayBuffer());

          const reader = new FileReader();
          reader.onload = () => {
            resolve((reader.result as string)?.split(',')[1]);
          };
          reader.readAsDataURL(blob);
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
