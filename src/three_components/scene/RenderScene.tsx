import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { reaction, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useThree } from '@react-three/fiber';
import { ErrorBoundary } from 'react-error-boundary';
import { useServerMaterialLoader } from '@/hooks/loader';
import { useToast } from '@/hooks/useToast';
import storeContainer from '@/store/storeContainer';
import loadMxJson from '@/utils/json/loadMxJson';
import SceneEffect from '../common/SceneEffect';
import ChildGizmo from '../gizmo/ChildGizmo';
import Gizmo from '../gizmo/Gizmo';
import executeContextMenu from '../utils/executeContextMenu';
import keyboardSceneEvents from '../utils/keyboardSceneEvents';
import makeSelectedGroup from '../utils/makeSelectedGroup';
import onClickSceneEvents from '../utils/onClickSceneEvents';
import onContextMenuSceneEvents from '../utils/onContextMenuSceneEvents';
import onDropSceneEvents from '../utils/onDropSceneEvents';
import onMouseDownSceneEvents from '../utils/onMouseDownSceneEvents';
import onMouseUpSceneEvents from '../utils/onMouseUpSceneEvents';
import { renderObjects } from '../utils/renderThreeComponents';

const RenderScene = () => {
  const {
    primitiveStore,
    mouseEventStore,
    contextMenuStore,
    keyboardEventStore,
    selectedObjectStore,
    projectStore,
    transformControlStore,
    canvasHistoryStore
  } = storeContainer;
  const [newMesh, setNewMesh] = useState(new THREE.Mesh());
  const { addToast } = useToast();

  const raycaster = useThree((state) => state.raycaster);
  const scene = useThree((state) => state.scene);
  const renderer = useThree((state) => state.gl);

  const selectedPrimitive = Object.values(primitiveStore.selectedPrimitives)[0];
  const materialName = selectedObjectStore.selectedMaterial;
  const material = useServerMaterialLoader(materialName);
  const selectedPrimitivesLength = Object.keys(
    primitiveStore.selectedPrimitives
  ).length;

  useEffect(() => {
    projectStore.setScene(scene);
    projectStore.setRenderer(renderer);
  }, [scene, projectStore, renderer]);

  useEffect(() => {
    // mouse event
    const dispose = reaction(
      () => {
        return mouseEventStore.currentMouseEvent;
      },
      (mouseEvent) => {
        const intersectObjects = raycaster.intersectObjects(
          Object.values(primitiveStore.meshes)
        );
        switch (mouseEvent[0]) {
          case 'onMouseDown': {
            onMouseDownSceneEvents();
            break;
          }
          case 'onMouseMove': {
            break;
          }
          case 'onMouseUp': {
            onMouseUpSceneEvents();
            break;
          }
          case 'onClick': {
            if (!transformControlStore.isFocused) {
              onClickSceneEvents(intersectObjects);
            }
            transformControlStore.clearFocused();
            break;
          }
          case 'onContextMenu': {
            onContextMenuSceneEvents(intersectObjects);
            break;
          }
          case 'onDrop': {
            onDropSceneEvents(mouseEvent[1] as React.DragEvent<HTMLDivElement>);
            break;
          }

          default:
            break;
        }
      }
    );

    return () => {
      dispose();
    };
  }, []);

  useEffect(() => {
    const renderLoadedMxJson = async () => {
      if (!projectStore.mxJson) return;
      const loader = new THREE.ObjectLoader();
      const decodedJson = await loadMxJson(toJS(projectStore.mxJson));
      const newScene = loader.parse(decodedJson.scene);
      primitiveStore.clearPrimitives();

      renderObjects(primitiveStore, newScene.children as THREE.Mesh[], true);
      projectStore.clearMxJson();
      addToast('프로젝트를 불러왔습니다.');
    };

    renderLoadedMxJson();
  }, [primitiveStore, projectStore.mxJson, scene, addToast, projectStore]);

  // 선택 컴포넌트 그룹화 작업
  useEffect(() => {
    if (selectedPrimitivesLength > 1) {
      makeSelectedGroup();
    }
  }, [selectedPrimitivesLength]);

  // keyboard event
  useEffect(() => {
    keyboardSceneEvents();
  }, [keyboardEventStore.currentKeyEvent]);

  // contextMenu 실행
  useEffect(() => {
    executeContextMenu(scene);
  }, [contextMenuStore.currentSelectedContextMenu, scene]);

  useEffect(() => {
    if (selectedPrimitive && selectedObjectStore.selectedMaterial) {
      setNewMesh(selectedPrimitive);
      newMesh.material = material;
      selectedObjectStore.setSelectedMaterial(materialName);
      canvasHistoryStore.addHistory('MATERIAL', 'change');
    }
  }, [selectedObjectStore.selectedMaterial]);

  return (
    <>
      <SceneEffect />

      {/* 일반 Object 용 */}
      {primitiveStore.meshes[
        Object.keys(primitiveStore.selectedPrimitives)[0]
      ] && (
        <Gizmo storeId={Object.keys(primitiveStore.selectedPrimitives)[0]} />
      )}

      {/* Group 자식용 */}
      <ChildGizmo />

      {Object.entries(primitiveStore.primitives).map(([id, primitive]) => {
        primitive.key = id;

        return (
          <ErrorBoundary
            key={id}
            fallback={<></>}
            onError={() => {
              addToast('오브젝트 에러!');
            }}
          >
            {primitive}
          </ErrorBoundary>
        );
      })}
      {primitiveStore.selectedGroupPrimitive[1]}
    </>
  );
};

const Observer = observer(RenderScene);
export default Observer;
