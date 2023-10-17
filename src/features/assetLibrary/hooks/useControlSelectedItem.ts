import { useCallback, useEffect, useState } from "react";
import assetLibraryStore from "@store/assetLibraryStore";
import { LibraryAsset } from "../types/fetchAssetType";

const hasItem = (item: LibraryAsset, list: LibraryAsset[]) => {
  return list.some((listItem) => listItem.name === item.name);
};

const useControlSelectedItem = (item: LibraryAsset): [boolean, () => void] => {
  const { selectedAssets } = assetLibraryStore;

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (hasItem(item, selectedAssets)) setIsChecked(true);
    else setIsChecked(false);
  }, [item, selectedAssets]);

  const updateSelectedAsset = useCallback(() => {
    if (isChecked) {
      assetLibraryStore.removeSelectedAsset(item);
    } else {
      assetLibraryStore.addSelectedAsset(item);
    }
    setIsChecked(!isChecked);
  }, [item, isChecked]);

  return [isChecked, updateSelectedAsset];
};

export default useControlSelectedItem;
