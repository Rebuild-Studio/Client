import { observable } from "mobx";

type EditorMode = "canvas" | "interaction";

interface EditorModeStoreProps {
  editorMode: EditorMode;
  canvasBarOpen: boolean;
  interactionBarOpen: boolean;
  setEditorMode: (mode: EditorMode) => void;
  toggleCanvasBar: () => void;
  toggleInteractionBar: () => void;
}

const editorModeStore = observable<EditorModeStoreProps>({
  editorMode: "canvas",
  canvasBarOpen: true,
  interactionBarOpen: true,
  setEditorMode: (mode: EditorMode) => {
    editorModeStore.editorMode = mode;
  },
  toggleCanvasBar: () => {
    editorModeStore.canvasBarOpen = !editorModeStore.canvasBarOpen;
  },
  toggleInteractionBar: () => {
    editorModeStore.interactionBarOpen = !editorModeStore.interactionBarOpen;
  },
});

export type { EditorModeStoreProps };
export default editorModeStore;
