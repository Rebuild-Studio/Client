import NodeProcess from "../NodeProcess";

export default class ObjectAnimationProcess extends NodeProcess {
  constructor(nodeRuntime, key, refKey) {
    super(nodeRuntime, [], [key], []);
    this.key = key;
    this.refKey = refKey;
    this.nodeRuntime.setInputDefaultValue(key, undefined);
    this.setProp = this.setAnimationProps;
  }

  setAnimationProps(value) {
    this.nodeRuntime.metaObject.SetAnimationInteraction({
      name: this.refKey,
      weight: value,
    });
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
