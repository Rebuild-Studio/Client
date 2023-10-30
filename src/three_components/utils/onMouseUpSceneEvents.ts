import storeContainer from '@/store/storeContainer';

const onMouseUpSceneEvents = () => {
  const { canvasHistoryStore } = storeContainer;
  canvasHistoryStore.differMeshAttribute();
};

export default onMouseUpSceneEvents;
