import { DomainType } from "@/features/constants/domain";
import { MainCategoryType } from "@/features/constants/mainCategory";
import { observable } from "mobx";

interface AssetCategory {
  currentDomain: DomainType;
  currentMainCategory: MainCategoryType;
  currentSubCategory: string;

  setCurrentDomain: (domain: DomainType) => void;
  setCurrentMainCategory: (mainCategory: MainCategoryType) => void;
  setCurrentSubCategory: (subCategory: string) => void;
}

const assetCategoryStore = observable<AssetCategory>({
  currentDomain: "all",
  currentMainCategory: "all",
  currentSubCategory: "",

  setCurrentDomain(domain) {
    this.currentDomain = domain;
  },
  setCurrentMainCategory(mainCategory) {
    this.currentMainCategory = mainCategory;
  },
  setCurrentSubCategory(subCategory) {
    this.currentSubCategory = subCategory;
  },
});

export default assetCategoryStore;
