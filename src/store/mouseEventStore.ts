import { observable } from "mobx";

type MouseEventType =
  | "onMouseDown"
  | "onMouseMove"
  | "onMouseUp"
  | "onClick"
  | "onContextMenu"
  | "onDrop"
  | "NONE";

interface MouseEventProps {
  currentMouseEvent: [
    MouseEventType,
    (
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.DragEventHandler<HTMLDivElement>
      | null
    )
  ];
  updateMouseEvent: (
    mouseEvent: MouseEventType,
    eventValue:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.DragEvent<HTMLDivElement>
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
