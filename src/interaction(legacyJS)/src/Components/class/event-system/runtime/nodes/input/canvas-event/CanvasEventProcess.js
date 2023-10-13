import EventProcess from "../../super/EventProcess";

export default class CanvasEventProcess extends EventProcess {
  constructor(nodeRuntime) {
    super(nodeRuntime);
    this.eventDomElement = this.nodeRuntime.node.special.three.gl.domElement;
  }
  start() {
    this.eventListeners.forEach(({ type, listener, options }) => {
      this.eventDomElement?.addEventListener(type, listener, options);
    });
  }
  end() {
    this.eventListeners.forEach(({ type, listener, options }) => {
      this.eventDomElement?.removeEventListener(type, listener, options);
    })
  }
}