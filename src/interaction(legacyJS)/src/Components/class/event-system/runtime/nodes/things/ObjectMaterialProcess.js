import NodeProcess from "../NodeProcess";

export default class ObjectMaterialProcess extends NodeProcess {
  constructor(nodeRuntime, key, refKey) {
    super(nodeRuntime, [], [key], []);
    this.key = key;
    this.refKey = refKey;
    this.nodeRuntime.setInputDefaultValue(key, undefined);
    this.setProp = this.setMaterialProps;
  }

  setMaterialProps(value) {
    Object.keys(value).forEach((property) => {
      if (typeof value[property] !== "undefined") {
        switch (property) {
          case "Template":
            this.setMaterialTemplateProps(value[property]);
            break;
          default:
            this.nodeRuntime.metaObject.SetMaterialProps(
              this.refKey,
              property,
              value[property]
            );
            break;
        }
      }
    });
  }

  async setMaterialTemplateProps(value) {
    const newMaterial =
      Number(value) === 0
        ? this.nodeRuntime.node.special.object_store.GetMaterialPropsByUuid(
            this.refKey
          )["originMaterial"]
        : await this.nodeRuntime.node.special.loader_store.GetMaterialTextureByIdx(
            value
          );
    this.nodeRuntime.metaObject.ChangeMaterial(this.refKey, null, newMaterial);
  }

  coreWork(state, delta, xrFrame) {
    try {
      const value = this.inputs[this.key];
      if (typeof value !== "undefined") {
        this.setProp(value);
      }
    } catch (e) {
      this.setError(
        `ObjectRuntime: set ${this.refKey} of MetaObject is not available.`
      );
    }
  }
}
