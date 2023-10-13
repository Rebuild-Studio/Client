import { object_store } from "../stores/Object_Store";

const ObjectStateVM = {
  get selectedState() {
    let state = null;
    if (object_store.selectedObjects.length === 0) {
      return state;
    } else if (object_store.selectedObjects.length > 1) {
      state = "Multiple";
    } else {
      if (
        object_store.selectedObjects[0].type === "Group" ||
        object_store.selectedObjects[0].type === "Object3D"
      ) {
        state = "Group";
      } else if (object_store.selectedObjects[0].type === "Audio") {
        state = "Audio";
      } else {
        if (object_store.selectedObjects[0].props.lightType) state = "Light";
        else if (object_store.selectedObjects[0].props.cameraType)
          state = "Camera";
        else if (object_store.selectedObjects[0].mesh.children.length !== 0)
          state = "Dependency";
        else {
          state = "Object";
        }
      }
    }
    return state;
  },
  get Lock() {
    if (ObjectStateVM.selectedState === "Multiple") {
      for (const object of object_store.selectedObjects) {
        if (object.props["lock"]) return true;
      }
      return false;
    } else {
      const object = object_store.selectedObjects[0];
      if (object.type !== "Audio" && object.props["lock"]) return true;
      return false;
    }
  },
  get visible() {
    if (ObjectStateVM.selectedState === "Multiple") {
      for (const object of object_store.selectedObjects) {
        if (object.props["visible"]) return true;
      }
      return false;
    } else {
      const object = object_store.selectedObjects[0];
      if (object.props["visible"]) return true;
      return false;
    }
  },
};
export { ObjectStateVM };
