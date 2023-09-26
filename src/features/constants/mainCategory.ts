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

const MAIN_CATEGORY_LIST: { category: MainCategoryType; categoryKR: string }[] =
  [
    {
      category: "all",
      categoryKR: "전체",
    },
    {
      category: "tem",
      categoryKR: "템플릿",
    },
    {
      category: "spa",
      categoryKR: "공간",
    },
    {
      category: "cha",
      categoryKR: "캐릭터",
    },
    {
      category: "ani",
      categoryKR: "동물",
    },
    {
      category: "nat",
      categoryKR: "자연",
    },
    {
      category: "ico",
      categoryKR: "아이콘",
    },
    {
      category: "fas",
      categoryKR: "패션",
    },
    {
      category: "bea",
      categoryKR: "뷰티",
    },
    {
      category: "hom",
      categoryKR: "가구·집",
    },
    {
      category: "his",
      categoryKR: "역사·사회",
    },
    {
      category: "tec",
      categoryKR: "과학·기술",
    },
    {
      category: "sup",
      categoryKR: "용품",
    },
    {
      category: "mar",
      categoryKR: "음식·음료",
    },
    {
      category: "tra",
      categoryKR: "교통",
    },
    {
      category: "wea",
      categoryKR: "무기",
    },
  ];

export type { MainCategoryType };
export default MAIN_CATEGORY_LIST;
