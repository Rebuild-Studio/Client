import NodeProcess from "../NodeProcess";
export default class RandomProcess extends NodeProcess {
  coreWork() {
    if (this.Input(0)) {
      const out = Math.random() * this.Input(1);
      this.nodeRuntime.setOutputDefaultValueIndex(0, out);
      this.Outputs([out]);
    }
  }
}
