import storeContainer from "@/store/storeContainer";

const openLottieInModal = (
  lottieComponent: JSX.Element,
  isCancelable: boolean = true
) => {
  const { projectStateStore } = storeContainer;

  projectStateStore.updateModalCancelable(isCancelable);
  projectStateStore.updateModalComponent(lottieComponent);
  projectStateStore.updateModalState(true);
};

export default openLottieInModal;
