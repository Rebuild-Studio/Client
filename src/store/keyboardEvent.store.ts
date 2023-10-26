import { makeAutoObservable } from 'mobx';

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

class KeyboardEventStore {
  currentKeyEvent: KeyType = {
    key: '',
    isCtrlPressed: false,
    isShiftPressed: false,
    isAltPressed: false
  };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  updateKeyEvent(keyEvent: KeyType) {
    this.currentKeyEvent = keyEvent;
  }
  clearKeyEvent() {
    this.currentKeyEvent = {
      key: '',
      isCtrlPressed: false,
      isShiftPressed: false,
      isAltPressed: false
    };
  }
}

const keyboardEventStore = new KeyboardEventStore();

export type { KeyType, KeyboardEventProps };
export default keyboardEventStore;
