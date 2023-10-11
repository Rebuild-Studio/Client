import NodeProcess from "../NodeProcess";

export default class VariableProcess extends NodeProcess {
  constructor(nodeRuntime) {
    super(nodeRuntime);
    this.nodeRuntime.setOutputDefaultValueIndex(0, this.Datum(0));
  }
  coreWork(state, delta, xrFrame){
    this.nodeRuntime.setOutputDefaultValueIndex(0, this.Input(0));
  }
}