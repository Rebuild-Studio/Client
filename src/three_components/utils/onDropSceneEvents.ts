import React from 'react';
import { nanoid } from 'nanoid';
import storeContainer from '@/store/storeContainer';
import { showFullScreenLoading } from '@/utils/loading/loadingHandler';
import { renderLocalAsset } from './renderThreeComponents';

const onDropSceneEvents = (event: React.DragEvent<HTMLDivElement>) => {
  const { primitiveStore } = storeContainer;

  const files = event.dataTransfer.files;
  const fileList = Array.from(files);

  showFullScreenLoading();
  fileList.forEach((file) => {
    const storeId = nanoid();
    primitiveStore.addPrimitive(storeId, renderLocalAsset(storeId, file));
  });
};

export default onDropSceneEvents;
