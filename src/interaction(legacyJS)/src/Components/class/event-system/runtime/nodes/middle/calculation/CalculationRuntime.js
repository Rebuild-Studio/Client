import NodeRuntime from "../../NodeRuntime";
import AddProcess from "./AddProcess";
import DivideProcess from "./DivideProcess";
import MultiplyProcess from "./MultiplyProcess";
import SubtractProcess from "./SubtractProcess";

export default class CalculationRuntime extends NodeRuntime {
  constructor(args) {
    super(args);
    switch (this.data.calculation) {
      case "Divide":
        this.processes.push(new DivideProcess(this));
        break;
      case "Multiple":
        this.processes.push(new MultiplyProcess(this));
        break;
      case "Minus":
        this.processes.push(new SubtractProcess(this));
        break;
      case "Plus":
        this.processes.push(new AddProcess(this));
        break;
      default:
        this.setError(`CalculationRuntime: unknown calculation type: ${this.data.calculation}`);
        break;
    }
  }
}