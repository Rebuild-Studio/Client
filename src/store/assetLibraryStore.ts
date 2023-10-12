import { LibraryAsset } from "@/features/assetLibrary/types/fetchAssetType";
import { observable } from "mobx";

interface AssetLibraryControl {
  isAssetLibraryVisible: boolean;
  currentPage: number;

  toggleAssetLibraryVisibility: () => void;
  setCurrentPage: (page: number) => void;
  resetCurrentPage: () => void;
  initLibrary: () => void;
}

interface AssetLibraryItems {
  libraryAssets: LibraryAsset[];
  selectedAssets: LibraryAsset[];

  setLibraryAssets: (assets: LibraryAsset[]) => void;
  clearLibraryAssets: () => void;

  addSelectedAsset: (asset: LibraryAsset) => void;
  removeSelectedAsset: (asset: LibraryAsset) => void;
  clearSelectedAssets: () => void;
}

type AssetLibraryStore = AssetLibraryControl & AssetLibraryItems;

const assetLibraryStore = observable<AssetLibraryStore>({
  //assetLibrary Controls
  isAssetLibraryVisible: false,
  currentPage: 1,

  //assetLibrary Items
  libraryAssets: [],
  selectedAssets: [],

  initLibrary() {
    this.resetCurrentPage();
    this.clearLibraryAssets();
  },

  //assetLibrary Controls Actions
  toggleAssetLibraryVisibility() {
    this.isAssetLibraryVisible = !this.isAssetLibraryVisible;
  },
  setCurrentPage(page) {
    this.currentPage = page;
  },
  resetCurrentPage() {
    this.currentPage = 1;
  },

  //assetLibrary Items Actions
  setLibraryAssets(assets) {
    this.libraryAssets = assets;
  },
  clearLibraryAssets() {
    this.libraryAssets = [];
  },

  //selectedAssetLibrary Items Actions
  addSelectedAsset(asset) {
    this.selectedAssets.push(asset);
  },
  removeSelectedAsset(asset) {
    this.selectedAssets = this.selectedAssets.filter(
      (selectedAsset) => selectedAsset.id !== asset.id
    );
  },
  clearSelectedAssets() {
    this.selectedAssets = [];
  },
});

export default assetLibraryStore;
