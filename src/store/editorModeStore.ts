import { makeAutoObservable } from "mobx";

type EditorMode = "canvas" | "interaction";

class EditorModeStore {
  editorMode = "canvas";
  canvasBarOpen = true;
  interactionBarOpen = true;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setEditorMode(mode: EditorMode) {
    this.editorMode = mode;
  }
  toggleCanvasBar() {
    this.canvasBarOpen = !this.canvasBarOpen;
  }
  toggleInteractionBar() {
    this.interactionBarOpen = !this.interactionBarOpen;
  }
}

const editorModeStore = new EditorModeStore();

export default editorModeStore;
