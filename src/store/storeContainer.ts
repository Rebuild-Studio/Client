import primitiveStore from "./primitiveStore";
import userStore from "./userStore";
import mouseEventStore from "./mouseEventStore";
import transformControlStore from "./transformControlStore";
import keyboardEventStore from "./keyboardEventStore";
import contextMenuStore from "./contextMenuStore";
import projectStateStore from "./projectStateStore";
import canvasHistoryStore from "./canvasHistoryStore";
import assetLibraryStore from "./assetLibraryStore";
import assetCategoryStore from "./assetCategoryStore";

const storeContainer = {
  primitiveStore: primitiveStore,
  userStore: userStore,
  mouseEventStore: mouseEventStore,
  transformControlStore: transformControlStore,
  keyboardEventStore: keyboardEventStore,
  contextMenuStore: contextMenuStore,
  projectStateStore: projectStateStore,
  canvasHistoryStore: canvasHistoryStore,
  assetLibraryStore: assetLibraryStore,
  assetCategoryStore: assetCategoryStore,
};

export default storeContainer;
