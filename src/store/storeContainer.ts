import primitiveStore, { PrimitiveStore } from "./primitiveStore";
import selectedobjectStore, { SelectedObjectProps } from "./selectedObjectStore";
import userStore, { UserStoreProps } from "./userStore";
import mouseEventStore, { MouseEventProps } from "./mouseEventStore";
import transformControlStore, { TransformControlProps } from "./transformControlStore";
import keyboardEventStore, { KeyboardEventProps } from "./keyboardEventStore";
import contextMenuStore, { ContextMenuRenderProps } from "./contextMenuStore";
import projectStateStore, { ProjectStateProps } from "./projectStateStore";
import canvasHistoryStore, { CanvasHistoryStoreProps } from "./canvasHistoryStore";
import renderStore, { RenderStoreProps } from "./renderStore";
import assetLibraryStore, { AssetLibraryStoreProps } from "./assetLibraryStore";
import assetCategoryStore, { AssetCategoryStore } from "./assetCategoryStore";
import sceneSettingStore, { SceneSettingStoreProps } from "./sceneSettingStore";
import controllerBarStore, { ControllerBarStoreProps } from "@/features/controllerBar/store/controllerBarStore";
import editorModeStore, { EditorModeStoreProps } from "@store/editorModeStore";

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

interface StoreContainerProps  {
  primitiveStore: PrimitiveStore;
  selectedObjectStore: SelectedObjectProps;
  userStore: UserStoreProps;
  mouseEventStore: MouseEventProps;
  transformControlStore: TransformControlProps;
  keyboardEventStore: KeyboardEventProps;
  contextMenuStore: ContextMenuRenderProps,
  projectStateStore: ProjectStateProps,
  canvasHistoryStore: CanvasHistoryStoreProps,
  renderStore: RenderStoreProps,
  assetLibraryStore: AssetLibraryStoreProps,
  assetCategoryStore: AssetCategoryStore,
  sceneSettingStore: SceneSettingStoreProps,
  controllerBarStore: ControllerBarStoreProps,
  editorModeStore: EditorModeStoreProps,
}

export type  { StoreContainerProps };
export default storeContainer;
