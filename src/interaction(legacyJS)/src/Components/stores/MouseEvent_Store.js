import { observable } from "mobx";

const mouseEvent_store = observable({
  OrbitControllerTriggeredAfterMoved: false,
  transformControllerTriggeredAfterMoved: false,
  mouseMoveCounter: 0,
  MOUSE_MOVE_JUDGE_COUNT: 20,
});

export { mouseEvent_store };
