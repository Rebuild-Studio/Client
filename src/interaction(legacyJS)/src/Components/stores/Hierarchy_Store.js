import { observable } from "mobx";

const hierarchy_store = observable({
  hierachyList: [],
  interactionHierarchyList: [],
  dividerIndex: -1,
});

export { hierarchy_store };
