import EventProcess from "../super/EventProcess";
import { raycastFormat as format } from "../../utils";

export default class RaycastProcess extends EventProcess {
  constructor(nodeRuntime) {
    super(nodeRuntime);
    this.canvasEventListeners = [];
    this.eventDomElement = this.nodeRuntime.node.special.three.gl.domElement;
    if (this.data.NODE_DAT_HOLD === "Hold") {
      this.registerEventListener(format("onPointerDown"), (e) =>
        this.handleEventTrue(e)
      );
      this.registerCanvasEventListener("mouseup", (e) =>
        this.handleEventFalse(e)
      );
    } else {
      this.nodeRuntime.setOutputDefaultValueIndex(0, false);
      this.registerEventListener(format("onClick"), (e) =>
        this.handleEventTrue(e)
      );
    }
  }
  registerCanvasEventListener(type, listener, options) {
    this.canvasEventListeners.push({
      type: type,
      listener: listener,
      options: options,
    });
  }
  compareCode(e) {
    return e.button === 0;
  }
  start() {
    // ReactMetaScene
    this.eventListeners.forEach(({ type, listener }) => {
      if (!this.nodeRuntime.metaObject[type]) {
        this.nodeRuntime.metaObject[type] = [];
      }
      this.nodeRuntime.metaObject[type].push(listener);
    });
    // Canvas
    this.canvasEventListeners.forEach(({ type, listener, options }) => {
      this.eventDomElement?.addEventListener(type, listener, options);
    });
  }
  end() {
    // ReactMetaScene
    this.eventListeners.forEach(({ type }) => {
      if (this.nodeRuntime.metaObject[type]) {
        delete this.nodeRuntime.metaObject[type];
      }
    });
    // Canvas
    this.canvasEventListeners.forEach(({ type, listener, options }) => {
      this.eventDomElement?.removeEventListener(type, listener, options);
    });
  }
}
