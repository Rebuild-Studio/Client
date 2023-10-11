import { observable } from "mobx";

const Material_store = observable({
  materialTemplateName: null,
  materialProps: [],
  hsva: [],
  metaMaterials: {},
  materialIndex: 0,
});
export { Material_store };
