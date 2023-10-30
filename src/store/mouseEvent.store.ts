import { DragEvent, DragEventHandler, MouseEvent } from 'react';
import { makeAutoObservable } from 'mobx';

type MouseEventType =
  | 'onMouseDown'
  | 'onMouseMove'
  | 'onMouseUp'
  | 'onClick'
  | 'onContextMenu'
  | 'onDrop'
  | 'NONE';

class MouseEventStore {
  currentMouseEvent: [
    MouseEventType,
    (
      | MouseEvent<HTMLDivElement, MouseEvent>
      | DragEventHandler<HTMLDivElement>
      | null
    )
  ] = ['NONE', null];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  updateMouseEvent(
    mouseEvent: MouseEventType,
    eventValue:
      | MouseEvent<HTMLDivElement, MouseEvent>
      | DragEvent<HTMLDivElement>
  ) {
    this.currentMouseEvent = [mouseEvent, eventValue];
  }
  clearMouseEvent() {
    this.currentMouseEvent = ['NONE', null];
  }
}

const mouseEventStore = new MouseEventStore();

export type { MouseEventType };
export default mouseEventStore;
