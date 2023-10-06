import { observable } from "mobx";

interface AssetLibraryControl {
  isAssetLibraryVisible: boolean;
  currentPage: number;
}

interface AssetLibraryControlAction {
  toggleAssetLibraryVisibility: () => void;
  setCurrentPage: (page: number) => void;
}

type AssetLibrary = AssetLibraryControl & AssetLibraryControlAction;

const assetLibraryStore = observable<AssetLibrary>({
  //assetLibrary Controls
  isAssetLibraryVisible: false,
  currentPage: 1,

  //assetLibrary Controls Actions
  toggleAssetLibraryVisibility() {
    this.isAssetLibraryVisible = !this.isAssetLibraryVisible;
  },
  setCurrentPage(page) {
    this.currentPage = page;
  },
});

export default assetLibraryStore;
