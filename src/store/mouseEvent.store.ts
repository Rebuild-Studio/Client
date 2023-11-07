import { DragEvent, MouseEvent } from 'react';
import { makeAutoObservable } from 'mobx';

type MouseEventType =
  | 'onMouseDown'
  | 'onMouseMove'
  | 'onMouseUp'
  | 'onClick'
  | 'onContextMenu'
  | 'onDrop'
  | 'NONE';

type MouseEventHandlerType<T extends HTMLElement> =
  | DragEvent<T>
  | MouseEvent<T>
  | null;

class MouseEventStore {
  currentMouseEvent: [MouseEventType, MouseEventHandlerType<HTMLElement>] = [
    'NONE',
    null
  ];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  updateMouseEvent(
    mouseEvent: MouseEventType,
    eventValue: MouseEvent<HTMLDivElement> | DragEvent<HTMLDivElement>
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
