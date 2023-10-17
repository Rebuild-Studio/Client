import { Category } from "@store/assetCategoryStore";

type MainCategoryType =
  | "all"
  | "tem"
  | "spa"
  | "cha"
  | "ani"
  | "nat"
  | "ico"
  | "fas"
  | "bea"
  | "hom"
  | "his"
  | "tec"
  | "sup"
  | "mar"
  | "tra"
  | "wea";

interface MainCategory extends Category {
  category: MainCategoryType;
  categoryKR: string;
}

const CATEGORY_MAP: Record<MainCategoryType, string> = {
  all: "전체",
  tem: "템플릿",
  spa: "공간",
  cha: "캐릭터",
  ani: "동물",
  nat: "자연",
  ico: "아이콘",
  fas: "패션",
  bea: "뷰티",
  hom: "가구·집",
  his: "역사·사회",
  tec: "과학·기술",
  sup: "용품",
  mar: "음식·음료",
  tra: "교통",
  wea: "무기"
};

const MAIN_CATEGORY_LIST: MainCategory[] = Object.entries(CATEGORY_MAP).map(
  ([category, categoryKR]) => ({
    category: category as MainCategoryType,
    categoryKR
  })
);
export type { MainCategoryType, MainCategory };
export default MAIN_CATEGORY_LIST;
