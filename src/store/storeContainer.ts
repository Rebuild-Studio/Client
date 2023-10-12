import primitiveStore from "./primitiveStore";
import selectedobjectStore from "./selectedObjectStore";
import userStore from "./userStore";
import mouseEventStore from "./mouseEventStore";
import transformControlStore from "./transformControlStore";
import keyboardEventStore from "./keyboardEventStore";
import contextMenuStore from "./contextMenuStore";
import projectStateStore from "./projectStateStore";
import canvasHistoryStore from "./canvasHistoryStore";
import rightPanelStore from "./rightPanelStore";
import sceneSettingStore from "./sceneSettingStore";

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
  rightPanelStore: rightPanelStore,
  sceneSettingStore: sceneSettingStore,
};

export default storeContainer;
