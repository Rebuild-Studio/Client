import NodeProcess from "../NodeProcess";

export default class EventProcess extends NodeProcess {
  constructor(nodeRuntime) {
    super(nodeRuntime);
    this.eventListeners = [];
  }
  compareCode() {
    return false;
  }
  handleEventTrue(e) {
    this.handleEventOutput(e, true);
  }
  handleEventFalse(e) {
    this.handleEventOutput(e, false);
  }
  handleEventOutput(e, value) {
    if (this.compareCode(e)) {
      this.Outputs([value], true);
    }
  }
  registerEventListener(type, listener, options) {
    this.eventListeners.push({
      type: type,
      listener: listener,
      options: options
    })
  }
}