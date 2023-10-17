import MiddleProcess from "./MiddleProcess";

export default class MapProcess extends MiddleProcess {
  constructor(nodeRuntime) {
    super(nodeRuntime);
    const inputMin = this.data.NODE_DAT_INPUT_MIN;
    const inputMax = this.data.NODE_DAT_INPUT_MAX;
    if (inputMax === inputMin) {
      this.calculate = () => {
        return [0];
      }
    }
    const outputMin = this.data.NODE_DAT_OUTPUT_MIN;
    const outputMax = this.data.NODE_DAT_OUTPUT_MAX;
    const inverse = this.data.NODE_DAT_INVERSE;
    const deltaOutput = (outputMax - outputMin) * (inverse ? -1 : 1);
    const outputStart = inverse ? outputMax : outputMin;
    const bound = this.data.NODE_DAT_BOUND;
    const map = (input) => {
      return [(input - inputMin) * deltaOutput / (inputMax - inputMin) + outputStart];
    }
    if (bound) {
      this.calculate = (i) => {
        const input = i[0] < inputMin ? inputMin : (i[0] > inputMax ? inputMax : i[0]);
        return map(input);
      }
    } else {
      this.calculate = (i) => {
        const input = i[0];
        return map(input);
      }
    }
  }
}