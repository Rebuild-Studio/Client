import NodeProcess from "../NodeProcess";

export default class WarpInProcess extends NodeProcess {
  constructor(nodeRuntime) {
    super(nodeRuntime);
  }
  coreWork(state, delta, xrFrame){
    this.nodeRuntime.node.special.wireWarp[this.Datum[0]] = this.Input(0);
  }
}