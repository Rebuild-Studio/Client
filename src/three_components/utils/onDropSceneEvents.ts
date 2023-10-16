import React from "react";
import { nanoid } from "nanoid";
import storeContainer from "@/store/storeContainer";
import { renderLocalAsset } from "./renderThreeComponents";

const onDropSceneEvents = (event: React.DragEvent<HTMLDivElement>) => {
  const { primitiveStore } = storeContainer;

  const files = event.dataTransfer.files;
  const fileList = Array.from(files);

  fileList.forEach((file) => {
    const storeId = nanoid();
    const localAssetElement = renderLocalAsset(storeId, file);
    if (localAssetElement)
      primitiveStore.addPrimitive(storeId, renderLocalAsset(storeId, file));
  });
};

export default onDropSceneEvents;
