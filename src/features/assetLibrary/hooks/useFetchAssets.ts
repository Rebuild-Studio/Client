import { useEffect, useState } from "react";
import { LibraryAsset } from "../types/fetchAssetType";
import assetLibraryStore from "@/store/assetLibraryStore";

const fetchAssets = async () => {
  const res = await fetch("/mock/assetLibraryList.json");
  const assets = await res.json();
  return assets;
};

// 추후 인자로  category, domain 등 기입 필요
export const useFetchAssets = () => {
  const [assets, setAssets] = useState<LibraryAsset[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const loadAssets = async () => {
      setIsLoading(true);
      try {
        const assets = await fetchAssets();
        setAssets(assets);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadAssets().then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    assetLibraryStore.setLibraryAssets(assets);
  }, [assets]);

  return [isLoading, isError];
};
