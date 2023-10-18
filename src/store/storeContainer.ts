import primitiveStore from "./primitiveStore";
import selectedobjectStore from "./selectedObjectStore";
import userStore from "./userStore";
import mouseEventStore from "./mouseEventStore";
import transformControlStore from "./transformControlStore";
import keyboardEventStore from "./keyboardEventStore";
import contextMenuStore from "./contextMenuStore";
import projectStateStore from "./projectStateStore";
import canvasHistoryStore from "./canvasHistoryStore";
import sceneControlStore from "./sceneControlStore";
import renderStore from "./renderStore";
import assetLibraryStore from "./assetLibraryStore";
import assetCategoryStore from "./assetCategoryStore";
import sceneSettingStore from "./sceneSettingStore";
import controllerBarStore from "@/features/controllerBar/store/controllerBarStore";
import projectStore from "./projectStore";
import editorModeStore from "@store/editorModeStore";

const storeContainer = {
  primitiveStore: primitiveStore,
  selectedObjectStore: selectedobjectStore,
  userStore: userStore,
  mouseEventStore: mouseEventStore,
  transformControlStore: transformControlStore,
  keyboardEventStore: keyboardEventStore,
  contextMenuStore: contextMenuStore,
  projectStateStore: projectStateStore,
  canvasHistoryStore: canvasHistoryStore,
  sceneControlStore: sceneControlStore,
  renderStore: renderStore,
  assetLibraryStore: assetLibraryStore,
  assetCategoryStore: assetCategoryStore,
  sceneSettingStore: sceneSettingStore,
  controllerBarStore: controllerBarStore,
  projectStore: projectStore,
  editorModeStore: editorModeStore,
};

export default storeContainer;
