import ForegroundLoading from '@/features/lottie/components/ForegroundLoading';
import storeContainer from '@/store/storeContainer';

const showFullScreenLoading = (isCancelable: boolean = false) => {
  const { projectStateStore } = storeContainer;

  projectStateStore.clearModal();
  projectStateStore.updateModalComponent(<ForegroundLoading />);
  projectStateStore.updateModalCancelable(isCancelable);
  projectStateStore.updateModalState(true);
};

const closeFullScreenLoading = () => {
  const { projectStateStore } = storeContainer;

  projectStateStore.clearModal();
};

export { showFullScreenLoading, closeFullScreenLoading };
