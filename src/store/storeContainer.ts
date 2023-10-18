import primitiveStore from "./primitiveStore";
import selectedobjectStore from "./selectedObjectStore";
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
  renderStore: renderStore,
  assetLibraryStore: assetLibraryStore,
  assetCategoryStore: assetCategoryStore,
  sceneSettingStore: sceneSettingStore,
  controllerBarStore: controllerBarStore,
  editorModeStore: editorModeStore,
};

export default storeContainer;
