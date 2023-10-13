import NodeProcess from "../NodeProcess";

export default class WarpOutProcess extends NodeProcess {
  constructor(nodeRuntime) {
    super(nodeRuntime);
  }
  coreWork(state, delta, xrFrame){
    this.Output(0, this.nodeRuntime.node.special.wireWarp[this.Datum[0]]);
  }
}