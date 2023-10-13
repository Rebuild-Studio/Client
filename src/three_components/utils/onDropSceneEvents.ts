import storeContainer from "@/store/storeContainer";
import { nanoid } from "nanoid";
import React from "react";

const onDropSceneEvents = (event: React.DragEvent<HTMLDivElement>) => {
  const { primitiveStore } = storeContainer;

  const fileList = event.dataTransfer.files;

  const storeId = nanoid();

  // primitiveStore.addPrimitive(storeId);
};

export default onDropSceneEvents;
