import primitiveStore from "./primitiveStore";
import userStore from "./userStore";
import mouseEventStore from "./mouseEventStore";
import transformControlStore from "./transformControlStore";
import keyboardEventStore from "./keyboardEventStore";

const storeContainer = {
  primitiveStore: primitiveStore,
  userStore: userStore,
  mouseEventStore: mouseEventStore,
  transformControlStore: transformControlStore,
  keyboardEventStore: keyboardEventStore,
};

export default storeContainer;
