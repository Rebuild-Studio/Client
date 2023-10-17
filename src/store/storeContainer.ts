import controllerBarStore from "@/features/controllerBar/store/controllerBarStore";
import assetCategoryStore from "./assetCategoryStore";
import assetLibraryStore from "./assetLibraryStore";
import canvasHistoryStore from "./canvasHistoryStore";
import contextMenuStore from "./contextMenuStore";
import keyboardEventStore from "./keyboardEventStore";
import mouseEventStore from "./mouseEventStore";
import primitiveStore from "./primitiveStore";
import projectStateStore from "./projectStateStore";
import renderStore from "./renderStore";
import sceneSettingStore from "./sceneSettingStore";
import selectedobjectStore from "./selectedObjectStore";
import transformControlStore from "./transformControlStore";
import userStore from "./userStore";

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
};

export default storeContainer;
