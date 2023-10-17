import InputSocketRuntimes from "./InputSocketRuntimes";
import OutputSocketRuntimes from "./OutputSocketRuntimes";
import registerCallbacks from "./registerCallbacks";

export default class NodeRuntimeArguments {
  constructor(node, special) {
    this.name = node.name;
    this.uuid = node.uuid;
    this.type = node.type;
    this.control = node.control;
    this.referenceParameter = node.referenceParameter;
    this.inputSockets = new InputSocketRuntimes(node.inputSockets);
    this.outputSockets = new OutputSocketRuntimes(node.outputSockets);
    this.special = special;
    registerCallbacks(this);
  }
}
