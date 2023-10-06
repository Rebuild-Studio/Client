import assetCategoryStore from "@/store/assetCategoryStore";
import { observer } from "mobx-react";

const CategoryLabel = observer(() => {
  const { currentMainCategory, currentSubCategory } = assetCategoryStore;
  return (
    <div>{`${currentMainCategory.categoryKR} / ${currentSubCategory.categoryKR}`}</div>
  );
});

export default CategoryLabel;
