import { observable } from "mobx";

type EditorMode = "canvas" | "interaction";

interface EditorModeStoreProps {
  editorMode: EditorMode;
  setEditorMode: (mode: EditorMode) => void;
}

const editorModeStore = observable<EditorModeStoreProps>({
  editorMode: "canvas",
  setEditorMode: (mode: EditorMode) => {
    editorModeStore.editorMode = mode;
  },
});

export type { EditorModeStoreProps }
export default editorModeStore;
