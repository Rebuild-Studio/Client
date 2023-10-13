import NodeProcess from "../NodeProcess";

export default class StartProcess extends NodeProcess {
  constructor(nodeRuntime) {
    super(nodeRuntime);
    this.nodeRuntime.setOutputDefaultValueIndex(0, false);
  }
  start() {
    this.Outputs([true], true);
  }
}