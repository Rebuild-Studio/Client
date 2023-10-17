import { observable } from "mobx";

const contextMenu_store = observable({
  IsContextMenuOpen: false,
  position: { x: 0, y: 0 },
});

export { contextMenu_store };
