import storeContainer from '@/store/storeContainer';

const clearContextMenuHierarchy = () => {
  const { contextMenuStore } = storeContainer;

  contextMenuStore.updateIsContextMenuOpened(false);
};

export { clearContextMenuHierarchy };
