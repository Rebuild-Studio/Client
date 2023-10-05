import { DomainType } from "@/features/assetLibrary/constants/domain";
import { MainCategory } from "@/features/assetLibrary/constants/mainCategory";
import { observable } from "mobx";

interface Category {
  category: string;
  categoryKR: string;
}
interface AssetCategoryStore {
  currentDomain: { domain: DomainType; domainKR: string };
  currentMainCategory: MainCategory;
  currentSubCategory: Category;

  setCurrentDomain: (domain: { domain: DomainType; domainKR: string }) => void;
  setCurrentMainCategory: (mainCategory: MainCategory) => void;
  setCurrentSubCategory: (subCategory: Category) => void;
}

const assetCategoryStore = observable<AssetCategoryStore>({
  currentDomain: { domain: "all", domainKR: "전체" },
  currentMainCategory: {
    category: "all",
    categoryKR: "전체",
  },
  currentSubCategory: {
    category: "all",
    categoryKR: "전체",
  },

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

export type { Category, AssetCategoryStore };
export default assetCategoryStore;
