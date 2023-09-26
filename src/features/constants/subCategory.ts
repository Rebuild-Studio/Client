import { MainCategoryType } from "./mainCategory";

type SubCategoryList = {
  [key in MainCategoryType]?: {
    subCategories: {
      subCategory: string;
      subCategoryKR: string;
    }[];
  };
};

/**
 * @description
 * 특정 메인 카테고리에 속하는 서브 카테고리 리스트
 * @example
 * {
 * 'tem':{
 *  'subCategories':[
 *    {subCategory:'home',subCategoryKR:'집'},
 *    {subCategory:'office',subCategoryKR:'오피스'}
 *  ]
 * }
 * }
 */
const SUB_CATEGORY_LIST: SubCategoryList = {};

export default SUB_CATEGORY_LIST;
