import { observable } from "mobx";

interface RightPanel {
  type: string;
}

interface RightPanelStore extends RightPanel {
  getType(): string;
  setType(type: string): void;
}

const rightPanelStore: RightPanelStore = observable<RightPanelStore>({
  type: "none",

  getType() {
    return this.type;
  },

  setType(type: string) {
    this.type = type;
  },
} as RightPanelStore);

export default rightPanelStore;
