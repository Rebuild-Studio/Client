import primitiveStore from "./primitiveStore";
import userStore from "./userStore";
import mouseEventStore from "./mouseEventStore";
import transformControlStore from "./transformControlStore";
import keyboardEventStore from "./keyboardEventStore";
import contextMenuStore from "./contextMenuStore";
import projectStateStore from "./projectStateStore";
import canvasHistoryStore from "./canvasHistoryStore";
import renderStore from "./renderStore";
import assetLibraryStore from "./assetLibraryStore";
import assetCategoryStore from "./assetCategoryStore";
import sceneSettingStore from "./sceneSettingStore";
import controllerBarStore from "@/features/controllerBar/store/controllerBarStore";
import editorModeStore from "@store/editorModeStore";
import sceneControlStore from "./sceneControlStore";
import projectStore from "./projectStore";
import selectedObjectStore from "./selectedObjectStore";

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
  controllerBarStore,
};

export default storeContainer;
