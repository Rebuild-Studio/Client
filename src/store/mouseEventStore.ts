import { observable } from "mobx";

type MouseEventType =
  | "onMouseDown"
  | "onMouseMove"
  | "onMouseUp"
  | "onClick"
  | "onContextMenu"
  | "NONE";

interface MouseEventProps {
  currentMouseEvent: [
    MouseEventType,
    React.MouseEvent<HTMLDivElement, MouseEvent> | null
  ];
  updateMouseEvent: (
    mouseEvent: MouseEventType,
    eventValue: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  clearMouseEvent: () => void;
}

const mouseEventStore = observable<MouseEventProps>({
  currentMouseEvent: ["NONE", null],
  updateMouseEvent(mouseEvent, eventValue) {
    this.currentMouseEvent = [mouseEvent, eventValue];
  },
  clearMouseEvent() {
    this.currentMouseEvent = ["NONE", null];
  },
});

export default mouseEventStore;
