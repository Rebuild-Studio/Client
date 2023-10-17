import { observer } from "mobx-react";
import styled from "styled-components";
import assetCategoryStore from "@store/assetCategoryStore";

const CategoryLabel = observer(() => {
  const { currentMainCategory, currentSubCategory } = assetCategoryStore;
  return (
    <EllipsisSpan>{`${currentMainCategory.categoryKR} / ${currentSubCategory.categoryKR}`}</EllipsisSpan>
  );
});

export default CategoryLabel;

const EllipsisSpan = styled.span`
  width: 10%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
