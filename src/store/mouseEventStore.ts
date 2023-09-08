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
    React.MouseEvent<HTMLDivElement, MouseEvent> | "NONE"
  ];
  updateMouseEvent: (
    mouseEvent: MouseEventType,
    eventValue: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  clearMouseEvent: () => void;
}

const mouseEventStore = observable<MouseEventProps>({
  currentMouseEvent: ["NONE", "NONE"],
  updateMouseEvent(mouseEvent, eventValue) {
    this.currentMouseEvent = [mouseEvent, eventValue];
  },
  clearMouseEvent() {
    this.currentMouseEvent = ["NONE", "NONE"];
  },
});

export default mouseEventStore;
