import getPlatform from "./getPlatform";

const isCtrlEventTrigger = (e: KeyboardEvent) => {
  switch (getPlatform()) {
    case "macos": {
      return e.metaKey;
    }
    case "unknown": {
      return false;
    }
    default: {
      return e.ctrlKey;
    }
  }
};

export { isCtrlEventTrigger };
