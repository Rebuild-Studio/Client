import { LibraryAsset } from "@/features/assetLibrary/types/fetchAssetType";
import { observable } from "mobx";

interface AssetLibraryControl {
  isAssetLibraryVisible: boolean;
  currentPage: number;

  toggleAssetLibraryVisibility: () => void;
  setCurrentPage: (page: number) => void;
}

interface AssetLibraryItems {
  libraryAssets: LibraryAsset[];
  selectedAssets: LibraryAsset[];

  setLibraryAssets: (assets: LibraryAsset[]) => void;
}

type AssetLibraryStore = AssetLibraryControl & AssetLibraryItems;

const assetLibraryStore = observable<AssetLibraryStore>({
  //assetLibrary Controls
  isAssetLibraryVisible: false,
  currentPage: 1,

  //assetLibrary Items
  libraryAssets: [],
  selectedAssets: [],

  //assetLibrary Controls Actions
  toggleAssetLibraryVisibility() {
    this.isAssetLibraryVisible = !this.isAssetLibraryVisible;
  },
  setCurrentPage(page) {
    this.currentPage = page;
  },

  //assetLibrary Items Actions
  setLibraryAssets(assets) {
    this.libraryAssets = assets;
  },
});

export default assetLibraryStore;
