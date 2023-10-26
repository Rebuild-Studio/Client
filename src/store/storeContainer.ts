import primitiveStore, { PrimitiveStore } from "./primitiveStore";
import userStore, { UserStoreProps } from "./userStore";
import mouseEventStore, { MouseEventProps } from "./mouseEventStore";
import transformControlStore, {
  TransformControlProps,
} from "./transformControlStore";
import keyboardEventStore, { KeyboardEventProps } from "./keyboardEventStore";
import contextMenuStore, { ContextMenuRenderProps } from "./contextMenuStore";
import projectStateStore, { ProjectStateProps } from "./projectStateStore";
import canvasHistoryStore, {
  CanvasHistoryStoreProps,
} from "./canvasHistoryStore";
import renderStore, { RenderStoreProps } from "./renderStore";
import assetLibraryStore, { AssetLibraryStoreProps } from "./assetLibraryStore";
import assetCategoryStore, { AssetCategoryStore } from "./assetCategoryStore";
import sceneSettingStore, { SceneSettingStoreProps } from "./sceneSettingStore";
import controllerBarStore, {
  ControllerBarStoreProps,
} from "@/features/controllerBar/store/controllerBarStore";
import editorModeStore, { EditorModeStoreProps } from "@store/editorModeStore";
import sceneControlStore, { SceneControlStore } from "./sceneControlStore";
import projectStore from "./projectStore";
import selectedObjectStore, {
  SelectedObjectProps,
} from "./selectedObjectStore";

const storeContainer = {
  primitiveStore: primitiveStore,
  selectedObjectStore: selectedObjectStore,
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

interface StoreContainerProps {
  primitiveStore: PrimitiveStore;
  selectedObjectStore: SelectedObjectProps;
  userStore: UserStoreProps;
  mouseEventStore: MouseEventProps;
  transformControlStore: TransformControlProps;
  keyboardEventStore: KeyboardEventProps;
  contextMenuStore: ContextMenuRenderProps;
  projectStateStore: ProjectStateProps;
  canvasHistoryStore: CanvasHistoryStoreProps;
  renderStore: RenderStoreProps;
  assetLibraryStore: AssetLibraryStoreProps;
  assetCategoryStore: AssetCategoryStore;
  sceneSettingStore: SceneSettingStoreProps;
  controllerBarStore: ControllerBarStoreProps;
  editorModeStore: EditorModeStoreProps;
  projectStore: ProjectStateProps;
  sceneControlStore: SceneControlStore;
}

export type { StoreContainerProps };
export default storeContainer;
