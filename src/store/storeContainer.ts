import controllerBarStore from '@/features/controllerBar/store/controllerBar.store.ts';
import editorModeStore from '@store/editorMode.store.ts';
import assetCategoryStore from './assetCategory.store.ts';
import assetLibraryStore from './assetLibrary.store.ts';
import canvasHistoryStore from './canvasHistory.store.ts';
import contextMenuStore from './contextMenu.store.ts';
import keyboardEventStore from './keyboardEvent.store.ts';
import mouseEventStore from './mouseEvent.store.ts';
import primitiveStore from './primitive.store.ts';
import projectStore from './project.store.ts';
import projectStateStore from './projectState.store.ts';
import renderStore from './render.store.ts';
import sceneControlStore from './sceneControl.store.ts';
import sceneSettingStore from './sceneSetting.store.ts';
import selectedObjectStore from './selectedObject.store.tsx';
import transformControlStore from './transformControl.store.ts';
import userStore from './user.store.ts';

const storeContainer = {
  assetCategoryStore,
  assetLibraryStore,
  canvasHistoryStore,
  contextMenuStore,
  editorModeStore,
  keyboardEventStore,
  mouseEventStore,
  primitiveStore,
  projectStateStore,
  projectStore,
  renderStore,
  sceneControlStore,
  sceneSettingStore,
  selectedObjectStore,
  transformControlStore,
  userStore,

  // features
  controllerBarStore
};

export default storeContainer;
