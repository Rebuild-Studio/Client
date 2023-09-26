import { observable } from "mobx";

interface AssetCategory {
  domainList: string[];
  mainCategoryList: string[];
  subCategoryList: string[];
}

const assetCategoryStore = observable<AssetCategory>({
  domainList: [],
  mainCategoryList: [],
  subCategoryList: [],
});

export default assetCategoryStore;
