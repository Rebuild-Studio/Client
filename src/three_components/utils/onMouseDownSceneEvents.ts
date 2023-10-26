import storeContainer from '@/store/storeContainer';

const onMouseDownSceneEvents = () => {
  const { contextMenuStore } = storeContainer;

  contextMenuStore.updateIsContextMenuOpened(false);
};

export default onMouseDownSceneEvents;
