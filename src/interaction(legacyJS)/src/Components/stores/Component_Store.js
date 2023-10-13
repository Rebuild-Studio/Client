import { observable } from "mobx";

const component_store = observable({
  name: "",
  jsonData: null,
  url: null,
  metaFiles: [],
  personalFilePath: null,
  metaGroups: [],
  itemDesk: [],
  metaGroupsPos: [],
  componentName: "",
  saveMode: false,
});

export { component_store };
