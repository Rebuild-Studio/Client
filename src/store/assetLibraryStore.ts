import { LibraryAsset } from "@/features/assetLibrary/types/fetchAssetType";
import { makeAutoObservable } from "mobx";

class AssetLibraryStore {
  isAssetLibraryVisible = false;
  currentPage = 1;

  //assetLibrary Items
  libraryAssets: LibraryAsset[] = [];
  selectedAssets: LibraryAsset[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  initLibrary() {
    this.resetCurrentPage();
    this.clearLibraryAssets();
  }
  clearLibrary() {
    this.resetCurrentPage();
    this.clearLibraryAssets();
    this.clearSelectedAssets();
  }

  //assetLibrary Controls Actions
  toggleAssetLibraryVisibility() {
    this.isAssetLibraryVisible = !this.isAssetLibraryVisible;
  }
  setCurrentPage(page: number) {
    this.currentPage = page;
  }
  resetCurrentPage() {
    this.currentPage = 1;
  }

  //assetLibrary Items Actions
  setLibraryAssets(assets: LibraryAsset[]) {
    this.libraryAssets = assets;
  }
  clearLibraryAssets() {
    this.libraryAssets = [];
  }

  //selectedAssetLibrary Items Actions
  addSelectedAsset(asset: LibraryAsset) {
    this.selectedAssets.push(asset);
  }
  removeSelectedAsset(asset: LibraryAsset) {
    this.selectedAssets = this.selectedAssets.filter(
      (selectedAsset) => selectedAsset.id !== asset.id
    );
  }
  clearSelectedAssets() {
    this.selectedAssets = [];
  }
}

const assetLibraryStore = new AssetLibraryStore();

export default assetLibraryStore;
