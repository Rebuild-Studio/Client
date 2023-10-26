import controllerBarStore from '@/features/controllerBar/store/controllerBarStore';
import editorModeStore from '@store/editorModeStore';
import assetCategoryStore from './assetCategoryStore';
import assetLibraryStore from './assetLibraryStore';
import canvasHistoryStore from './canvasHistoryStore';
import contextMenuStore from './contextMenuStore';
import keyboardEventStore from './keyboardEventStore';
import mouseEventStore from './mouseEventStore';
import primitiveStore from './primitiveStore';
import projectStateStore from './projectStateStore';
import projectStore from './projectStore';
import renderStore from './renderStore';
import sceneControlStore from './sceneControlStore';
import sceneSettingStore from './sceneSettingStore';
import selectedObjectStore from './selectedObjectStore';
import transformControlStore from './transformControlStore';
import userStore from './userStore';

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
