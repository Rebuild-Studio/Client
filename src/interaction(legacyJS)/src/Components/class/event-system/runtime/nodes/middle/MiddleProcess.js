import NodeProcess from "../NodeProcess";

export default class MiddleProcess extends NodeProcess {
  coreWork(state, delta, xrFrame) {
    this.Outputs(this.calculate(this.Inputs()));
  }
  calculate(inputs) {
    this.setError(`MiddleProcess: calculation is undefined.`);
    return [];
  }
}