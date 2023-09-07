import transformControlStore from "./transformControlStore";
import mouseEventStore from "./mouseEventStore";
import primitiveStore from "./primitiveStore";
import userStore from "./userStore";

const storeContainer = {
  primitiveStore: primitiveStore,
  userStore: userStore,
  mouseEventStore: mouseEventStore,
  transformControlStore: transformControlStore,
};

export default storeContainer;
