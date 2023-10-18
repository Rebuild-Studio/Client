import storeContainer from "@/store/storeContainer";

// gizmo 이용중 카메라 이동 방지
const setCameraControlEnabled = (state: boolean) => {
  const { renderStore } = storeContainer;
  if (!renderStore.controls) return;
  renderStore.controls.enabled = state;
};

export { setCameraControlEnabled };
