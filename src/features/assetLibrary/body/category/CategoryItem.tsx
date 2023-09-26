import { MainCategoryType } from "@/features/constants/mainCategory";

interface Props {
  name: string;
  category: MainCategoryType;
  type?: "main" | "sub";
}

const CategoryItem = ({ name, category, type }: Props) => {
  return <button>{name + category + type}</button>;
};

export default CategoryItem;
