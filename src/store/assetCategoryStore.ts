import { Domain } from '@/features/assetLibrary/constants/domain';
import { MainCategory } from '@/features/assetLibrary/constants/mainCategory';
import { makeAutoObservable } from 'mobx';

interface Category {
  category: string;
  categoryKR: string;
}

class AssetCategoryStore {
  currentDomain: Domain = { domain: 'all', domainKR: '전체' };
  currentMainCategory = {
    category: 'all',
    categoryKR: '전체'
  };
  currentSubCategory = {
    category: 'all',
    categoryKR: '전체'
  };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setCurrentDomain(domain: Domain) {
    this.currentDomain = domain;
  }
  setCurrentMainCategory(mainCategory: MainCategory) {
    this.currentMainCategory = mainCategory;
  }
  setCurrentSubCategory(subCategory: Category) {
    this.currentSubCategory = subCategory;
  }
}

const assetCategoryStore = new AssetCategoryStore();

export type { Category, AssetCategoryStore };
export default assetCategoryStore;
