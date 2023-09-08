import primitiveStore from "./primitiveStore";
import userStore from "./userStore";
import mouseEventStore from "./mouseEventStore";
import transformControlStore from "./transformControlStore";

const storeContainer = {
  primitiveStore: primitiveStore,
  userStore: userStore,
  mouseEventStore: mouseEventStore,
  transformControlStore: transformControlStore,
};

export default storeContainer;
