import { observable } from "mobx";

interface KeyType {
  key: string;
  isCtrlPressed: boolean;
  isShiftPressed: boolean;
  isAltPressed: boolean;
}

interface KeyboardEventProps {
  currentKeyEvent: KeyType;
  updateKeyEvent: (keyEvent: KeyType) => void;
  clearKeyEvent: () => void;
}

const keyboardEventStore = observable<KeyboardEventProps>({
  currentKeyEvent: {
    key: "",
    isCtrlPressed: false,
    isShiftPressed: false,
    isAltPressed: false,
  },
  updateKeyEvent(keyEvent) {
    this.currentKeyEvent = keyEvent;
  },
  clearKeyEvent() {
    this.currentKeyEvent = {
      key: "",
      isCtrlPressed: false,
      isShiftPressed: false,
      isAltPressed: false,
    };
  },
});

export type { KeyType, KeyboardEventProps };
export default keyboardEventStore;
